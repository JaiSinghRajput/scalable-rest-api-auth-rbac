import jwt, { Secret, SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

type TokenPayload = {
  userId: string;
  email: string;
  role: "USER" | "ADMIN";
};

export const signAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET as Secret, {
    expiresIn: env.JWT_EXPIRES_IN
  } as SignOptions);
};

export const verifyAccessToken = (token: string): Express.UserTokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as Express.UserTokenPayload;
};
