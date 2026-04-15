import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserTokenPayload extends JwtPayload {
      userId: string;
      role: "USER" | "ADMIN";
      email: string;
    }

    interface Request {
      user?: UserTokenPayload;
    }
  }
}

export {};
