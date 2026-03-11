const express = require("express");
const router = express.Router();

const authMiddleware = require("./authMiddleware");
const {
  getRewards,
  claimDailyReward,
  claimReward,
  buyReward
} = require("./rewardController");

router.get("/", authMiddleware, getRewards);
router.post("/daily", authMiddleware, claimDailyReward);
router.post("/claim", authMiddleware, claimReward);
router.post("/buy", authMiddleware, buyReward);

module.exports = router;