import { Router } from "express";

import { authenticate } from "../../middlewares/authenticate";
import { validateRequest } from "../../middlewares/validateRequest";
import { login, profile, register } from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validation";

export const authRouter = Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered
 */
authRouter.post("/register", validateRequest(registerSchema), register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
authRouter.post("/login", validateRequest(loginSchema), login);

/**
 * @swagger
 * /api/v1/auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details
 */
authRouter.get("/profile", authenticate, profile);
