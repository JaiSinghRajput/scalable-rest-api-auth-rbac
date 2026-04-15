import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/apiError";
import { authService } from "./auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result
  });
});

export const profile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError("Unauthorized", 401);
  }

  const user = await authService.getProfile(req.user.userId);

  res.status(200).json({
    success: true,
    data: user
  });
});
