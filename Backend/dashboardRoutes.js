const express = require("express");
const authMiddleware = require("./authMiddleware");
const {
  getDashboardData,
  startQuest,
  continueLearning,
  chatCharacter,
  playAudioStory,
  openRealm
} = require("./dashboardController");

const router = express.Router();

router.get("/", authMiddleware, getDashboardData);
router.post("/start-quest", authMiddleware, startQuest);
router.post("/continue", authMiddleware, continueLearning);
router.post("/chat", authMiddleware, chatCharacter);
router.post("/audio", authMiddleware, playAudioStory);
router.post("/realm", authMiddleware, openRealm);

module.exports = router;