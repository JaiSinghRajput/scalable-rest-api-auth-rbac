import { api } from "./client";
import type { AuthPayload, User } from "../types";

export const authApi = {
  async register(input: { name: string; email: string; password: string; role?: string }) {
    const response = await api.post<{ success: boolean; data: AuthPayload }>("/api/v1/auth/register", input);
    return response.data.data;
  },
  async login(input: { email: string; password: string }) {
    const response = await api.post<{ success: boolean; data: AuthPayload }>("/api/v1/auth/login", input);
    return response.data.data;
  },
  async profile() {
    const response = await api.get<{ success: boolean; data: User }>("/api/v1/auth/profile");
    return response.data.data;
  }
};
