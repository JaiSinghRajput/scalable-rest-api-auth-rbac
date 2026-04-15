import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { deleteUser, getAllUsers } from "./user.controller";

export const userRouter = Router();

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User list
 */
userRouter.get("/", authenticate, authorize("ADMIN"), getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by id (admin only)
 *     tags: [Users]
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
 *         description: User deleted
 */
userRouter.delete("/:id", authenticate, authorize("ADMIN"), deleteUser);
