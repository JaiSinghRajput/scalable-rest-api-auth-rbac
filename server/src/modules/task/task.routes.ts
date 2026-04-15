import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createTask,
  deleteTaskById,
  getTaskById,
  getTasks,
  updateTaskById
} from "./task.controller";
import {
  createTaskSchema,
  listTasksQuerySchema,
  taskIdSchema,
  updateTaskSchema
} from "./task.validation";

export const taskRouter = Router();

taskRouter.use(authenticate);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created
 */
taskRouter.post("/", validateRequest(createTaskSchema), createTask);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: List tasks (admin gets all, user gets own)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task list
 */
taskRouter.get("/", validateRequest(listTasksQuerySchema), getTasks);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 */
taskRouter.get("/:id", validateRequest(taskIdSchema), getTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   put:
 *     summary: Update task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Task updated
 */
taskRouter.put("/:id", validateRequest(updateTaskSchema), updateTaskById);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   delete:
 *     summary: Delete task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted
 */
taskRouter.delete("/:id", validateRequest(taskIdSchema), deleteTaskById);
