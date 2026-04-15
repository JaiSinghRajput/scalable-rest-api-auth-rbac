import { Request, Response } from "express";

import { asyncHandler } from "../../utils/asyncHandler";
import { userService } from "./user.service";

export const getAllUsers = asyncHandler(async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    data: users
  });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  await userService.deleteUserById(String(req.params.id));

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});
