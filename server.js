import express from "express";
import dotenv from "dotenv";
import leaderboardRoutes from "./routes/leaderboard.js";
import { createClient } from "redis";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Redis setup
export const redis = createClient({ url: process.env.REDIS_URL });
redis.on("error", (err) => console.error("Redis error:", err));
await redis.connect();

// Routes
app.use("/api", leaderboardRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
