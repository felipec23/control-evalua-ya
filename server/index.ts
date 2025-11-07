import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { processCVRoute } from "./routes/process-cv.js";

// Load environment variables from .env file
config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api", processCVRoute);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
