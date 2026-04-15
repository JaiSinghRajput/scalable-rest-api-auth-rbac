import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().min(24).max(24)
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().max(1000).optional(),
    status: z.enum(["pending", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional()
  })
});

export const updateTaskSchema = z.object({
  params: paramsSchema,
  body: z
    .object({
      title: z.string().trim().min(2).max(120).optional(),
      description: z.string().trim().max(1000).optional(),
      status: z.enum(["pending", "completed"]).optional(),
      priority: z.enum(["low", "medium", "high"]).optional()
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: "At least one field is required"
    })
});

export const taskIdSchema = z.object({
  params: paramsSchema
});

export const listTasksQuerySchema = z.object({
  query: z.object({
    status: z.enum(["pending", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    search: z.string().trim().max(100).optional()
  })
});
