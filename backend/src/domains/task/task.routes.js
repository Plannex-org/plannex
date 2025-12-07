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