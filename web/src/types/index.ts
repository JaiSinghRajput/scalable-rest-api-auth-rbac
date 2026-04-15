export type Role = "USER" | "ADMIN";
export type TaskStatus = "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt?: string;
};

export type AuthPayload = {
  user: User;
  accessToken: string;
};

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  owner?: {
    id: string;
    name: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};
