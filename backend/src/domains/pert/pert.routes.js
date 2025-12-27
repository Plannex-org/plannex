import express from "express";
import { getPERTResults } from "./pert.controller.js";

const router = express.Router({ mergeParams: true });

router.post("/projects/:projectId/pert", getPERTResults);

export default router;
