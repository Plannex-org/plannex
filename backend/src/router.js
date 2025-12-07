import express from "express";
import authRouter from "./domains/auth/auth.routes.js";
import projectRouter from "./domains/project/project.routes.js";
import taskRouter from "./domains/task/task.routes.js";
import userRouter from "./domains/user/user.routes.js";
import { authMiddleware } from "./core/middleware/auth.js";

const appRouter = express.Router();

// Public routes
appRouter.use("/auth", authRouter);

// Protected routes
appRouter.use("/projects", authMiddleware, projectRouter);
appRouter.use("/tasks", authMiddleware, taskRouter);
appRouter.use("/users", authMiddleware, userRouter);

export default appRouter;
