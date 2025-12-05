import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Get all users placeholder" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create user placeholder" });
});

export default router;
