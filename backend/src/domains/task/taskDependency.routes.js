import express from "express";
import { taskDependencyController } from "./taskDependency.controller.js";

const router = express.Router();

router.post("/task-dependencies", taskDependencyController.create);
router.put("/task-dependencies/:id", taskDependencyController.update);
router.delete("/task-dependencies/:id", taskDependencyController.remove);

export default router;