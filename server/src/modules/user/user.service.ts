import { Types } from "mongoose";

import { ApiError } from "../../utils/apiError";
import { UserModel } from "./user.model";
import { SafeUser, UserRole } from "./user.types";

const toSafeUser = (user: {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}): SafeUser => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const userService = {
  async getAllUsers(): Promise<SafeUser[]> {
    const users = await UserModel.find({}, "name email role createdAt updatedAt").sort({ createdAt: -1 });
    return users.map((user) => toSafeUser(user));
  },

  async getById(userId: string): Promise<SafeUser> {
    const user = await UserModel.findById(userId, "name email role createdAt updatedAt");

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return toSafeUser(user);
  },

  async deleteUserById(userId: string): Promise<void> {
    const deleted = await UserModel.findByIdAndDelete(userId);

    if (!deleted) {
      throw new ApiError("User not found", 404);
    }
  }
};
