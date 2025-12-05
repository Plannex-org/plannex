import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
  res.json({ message: "Auth login route placeholder" });
});

router.post("/register", (req, res) => {
  res.json({ message: "Auth register route placeholder" });
});

export default router;
