import express from "express";
import { redis } from "../server.js";
const router = express.Router();

const LEADERBOARD_KEY = "leaderboard";

router.post("/submit", async (req, res) => {
  const { user_id, score } = req.body;
  if (!user_id || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid payload" });
  }

  await redis.zAdd(LEADERBOARD_KEY, [{ score, value: user_id }]);
  res.json({ message: "Score submitted" });
});

router.get("/leaderboard", async (req, res) => {
  const limit = parseInt(req.query.limit || "10", 10);
  const result = await redis.zRangeWithScores(LEADERBOARD_KEY, -limit, -1, {
    REV: true,
  });
  res.json(result.reverse());
});

router.get("/rank/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const rank = await redis.zRevRank(LEADERBOARD_KEY, user_id);
  const score = await redis.zScore(LEADERBOARD_KEY, user_id);

  if (rank === null) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ user_id, score, rank: rank + 1 });
});

export default router;
