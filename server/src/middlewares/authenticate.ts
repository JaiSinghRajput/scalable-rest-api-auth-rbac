import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";
import { verifyAccessToken } from "../utils/jwt";

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    next(new ApiError("Unauthorized", 401));
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (_error) {
    next(new ApiError("Invalid or expired token", 401));
  }
};
