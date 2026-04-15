import { Request, Response } from "express";

import { ApiError } from "../../utils/apiError";
import { asyncHandler } from "../../utils/asyncHandler";
import { taskService } from "./task.service";

const requireUser = (req: Request) => {
  if (!req.user) {
    throw new ApiError("Unauthorized", 401);
  }

  return req.user;
};

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const task = await taskService.createTask(req.body, user);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: task
  });
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const tasks = await taskService.getTasks(req.query, user);

  res.status(200).json({
    success: true,
    data: tasks
  });
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const task = await taskService.getTaskById(String(req.params.id), user);

  res.status(200).json({
    success: true,
    data: task
  });
});

export const updateTaskById = asyncHandler(async (req: Request, res: Response) => {
  const user = requireUser(req);
  const task = await taskService.updateTaskById(String(req.params.id), req.body, user);

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
});

export const deleteTaskById = asyncHandler(async (req: Request, res: Response) => {
  const user = requireUser(req);
  await taskService.deleteTaskById(String(req.params.id), user);

  res.status(200).json({
    success: true,
    message: "Task deleted successfully"
  });
});
