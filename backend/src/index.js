import express from "express";
import appRouter from "./router.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api", appRouter);

app.listen(PORT, () => {
  console.log("=======================================");
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📦 API base path: /api");
  console.log("=======================================");
});