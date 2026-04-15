import { api } from "./client";
import type { User } from "../types";

export const userApi = {
  async list() {
    const response = await api.get<{ success: boolean; data: User[] }>("/api/v1/users");
    return response.data.data;
  },

  async remove(id: string) {
    await api.delete(`/api/v1/users/${id}`);
  }
};