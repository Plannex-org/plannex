const express = require("express");
const router = express.Router();
const taskController = require("./task.controller");

// CREATE
router.post("/", taskController.createTask);

// READ ALL TASKS OF PROJECT
router.get("/project/:projectId", taskController.getTasksByProject);

// READ ONE
router.get("/:id", taskController.getTaskById);

// UPDATE
router.patch("/:id", taskController.updateTask);

// DELETE (soft delete)
router.delete("/:id", taskController.deleteTask);

module.exports = router;