import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";

export const authorize = (...roles: Array<"USER" | "ADMIN">) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new ApiError("Unauthorized", 401));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(new ApiError("Forbidden", 403));
      return;
    }

    next();
  };
};
