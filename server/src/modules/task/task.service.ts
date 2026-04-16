import { Types } from "mongoose";

import { ApiError } from "../../utils/apiError";
import { UserModel } from "../user/user.model";
import { ITask, TaskModel } from "./task.model";
import { TaskListQuery } from "./task.types";

type CurrentUser = {
  userId: string;
  role: "USER" | "ADMIN";
};

const buildScope = (currentUser: CurrentUser): Partial<ITask> => {
  if (currentUser.role === "ADMIN") {
    return {};
  }

  return {
    userId: new Types.ObjectId(currentUser.userId)
  };
};

const withTaskAccess = async (taskId: string, currentUser: CurrentUser) => {
  const task = await TaskModel.findById(taskId);

  if (!task) {
    throw new ApiError("Task not found", 404);
  }

  if (task.userId.toString() !== currentUser.userId) {
    throw new ApiError("Forbidden", 403);
  }

  return task;
};

export const taskService = {
  async createTask(
    input: {
      title: string;
      description?: string;
      status?: "pending" | "completed";
      priority?: "low" | "medium" | "high";
    },
    currentUser: CurrentUser
  ) {
    const task = await TaskModel.create({
      title: input.title,
      description: input.description ?? "",
      status: input.status ?? "pending",
      priority: input.priority ?? "medium",
      userId: new Types.ObjectId(currentUser.userId)
    });

    return task;
  },

  async getTasks(query: TaskListQuery, currentUser: CurrentUser) {
    const where: Record<string, unknown> = {
      ...buildScope(currentUser)
    };

    if (query.status) {
      where.status = query.status;
    }

    if (query.priority) {
      where.priority = query.priority;
    }

    if (query.search) {
      where.title = { $regex: query.search, $options: "i" };
    }

    const tasks = await TaskModel.find(where).sort({ createdAt: -1 });

    if (currentUser.role !== "ADMIN") {
      return tasks;
    }

    const userIds = Array.from(new Set(tasks.map((task) => task.userId.toString())));
    const users = await UserModel.find({ _id: { $in: userIds } }, "name email");

    const userMap = new Map(
      users.map((user) => [user._id.toString(), { id: user._id.toString(), name: user.name, email: user.email }])
    );

    return tasks.map((task) => {
      const taskObject = task.toJSON();

      return {
        ...taskObject,
        owner: userMap.get(task.userId.toString()) ?? null
      };
    });
  },

  async getTaskById(taskId: string, currentUser: CurrentUser) {
    const task = await withTaskAccess(taskId, currentUser);
    return task;
  },

  async updateTaskById(
    taskId: string,
    input: {
      title?: string;
      description?: string;
      status?: "pending" | "completed";
      priority?: "low" | "medium" | "high";
    },
    currentUser: CurrentUser
  ) {
    const task = await withTaskAccess(taskId, currentUser);

    if (input.title !== undefined) task.title = input.title;
    if (input.description !== undefined) task.description = input.description;
    if (input.status !== undefined) task.status = input.status;
    if (input.priority !== undefined) task.priority = input.priority;

    await task.save();
    return task;
  },

  async deleteTaskById(taskId: string, currentUser: CurrentUser): Promise<void> {
    const task = await withTaskAccess(taskId, currentUser);
    await task.deleteOne();
  }
};
