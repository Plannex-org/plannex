import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all tasks placeholder" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create task placeholder" });
});

export default router;
