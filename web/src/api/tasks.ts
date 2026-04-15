import { api } from "./client";
import type { Task } from "../types";

export type TaskInput = {
  title: string;
  description?: string;
  status?: "pending" | "completed";
  priority?: "low" | "medium" | "high";
};

export const taskApi = {
  async list() {
    const response = await api.get<{ success: boolean; data: Task[] }>("/api/v1/tasks");
    return response.data.data;
  },
  async create(input: TaskInput) {
    const response = await api.post<{ success: boolean; data: Task }>("/api/v1/tasks", input);
    return response.data.data;
  },
  async update(id: string, input: TaskInput) {
    const response = await api.put<{ success: boolean; data: Task }>(`/api/v1/tasks/${id}`, input);
    return response.data.data;
  },
  async remove(id: string) {
    await api.delete(`/api/v1/tasks/${id}`);
  }
};
