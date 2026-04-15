import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiError";

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new ApiError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
};
