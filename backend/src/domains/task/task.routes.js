// src/domains/task/task.routes.js
import express from "express";
import { taskController } from "./task.controller.js";

const router = express.Router();

router.post("/", taskController.create); // CREATE
router.get("/", taskController.getAll); // READ ALL
router.get("/:id", taskController.getOne); // READ ONE
router.put("/:id", taskController.update); // UPDATE
router.delete("/:id", taskController.remove); // DELETE

export default router;

/*
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all tasks placeholder" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create task placeholder" });
});

export default router;
*/