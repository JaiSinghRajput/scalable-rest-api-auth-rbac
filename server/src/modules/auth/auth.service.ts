import bcrypt from "bcryptjs";
import { env } from "../../config/env";
import { ApiError } from "../../utils/apiError";
import { signAccessToken } from "../../utils/jwt";
import { IUser, UserModel } from "../user/user.model";
import { SafeUser, UserRole } from "../user/user.types";

type AuthPayload = {
  user: SafeUser;
  accessToken: string;
};

const toSafeUser = (user: IUser & { _id: { toString: () => string } }): SafeUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const authService = {
  async register(input: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    adminKey?: string;
  }): Promise<AuthPayload> {
    const existingUser = await UserModel.findOne({ email: input.email.toLowerCase() });

    if (existingUser) {
      throw new ApiError("Email is already registered", 409);
    }

    const passwordHash = await bcrypt.hash(input.password, 12);
    const role = input.role ?? "USER";

    if (role === "ADMIN" && input.adminKey !== env.ADMIN_KEY) {
      throw new ApiError("Invalid admin key", 403);
    }

    const user = await UserModel.create({
      name: input.name,
      email: input.email.toLowerCase(),
      passwordHash,
      role
    });

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return {
      user: toSafeUser(user as IUser & { _id: { toString: () => string } }),
      accessToken
    };
  },

  async login(input: { email: string; password: string }): Promise<AuthPayload> {
    const user = await UserModel.findOne({ email: input.email.toLowerCase() }).select("+passwordHash");

    if (!user || !user.passwordHash) {
      throw new ApiError("Invalid email or password", 401);
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValidPassword) {
      throw new ApiError("Invalid email or password", 401);
    }

    const accessToken = signAccessToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    return {
      user: toSafeUser(user as IUser & { _id: { toString: () => string } }),
      accessToken
    };
  },

  async getProfile(userId: string): Promise<SafeUser> {
    const user = await UserModel.findById(userId, "name email role createdAt updatedAt");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return toSafeUser(user as IUser & { _id: { toString: () => string } });
  }
};
