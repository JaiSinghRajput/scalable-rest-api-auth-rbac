export type TaskStatus = "pending" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export type TaskListQuery = {
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
};
