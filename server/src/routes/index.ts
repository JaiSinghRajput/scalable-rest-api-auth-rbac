import { Router } from "express";

import { authRouter } from "../modules/auth/auth.routes";
import { taskRouter } from "../modules/task/task.routes";
import { userRouter } from "../modules/user/user.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/tasks", taskRouter);
