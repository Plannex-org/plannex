import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Get all projects placeholder" });
});

router.post("/", (req, res) => {
    res.json({ message: "Create project placeholder" });
});

export default router