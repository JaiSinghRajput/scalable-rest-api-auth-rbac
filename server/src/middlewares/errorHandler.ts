import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { env } from "../config/env";
import { logger } from "../config/logger";
import { ApiError } from "../utils/apiError";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      message: "Database validation failed",
      errors: Object.values(error.errors).map((item) => item.message)
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      message: "Invalid resource id"
    });
    return;
  }

  logger.error({ err: error }, "Unhandled application error");

  res.status(500).json({
    success: false,
    message: env.NODE_ENV === "production" ? "Internal server error" : "Internal server error",
    ...(env.NODE_ENV === "development" && error instanceof Error ? { detail: error.message } : {})
  });
};
