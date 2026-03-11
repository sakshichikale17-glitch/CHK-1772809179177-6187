const express = require("express");
const router = express.Router();

const authMiddleware = require("./authMiddleware");
const {
  getDashboardData,
  startQuest,
  continueLearning,
  openRealm,
  playAudioStory,
  chatCharacter,
  getGuideMessage
} = require("./dashboardController");

router.get("/", authMiddleware, getDashboardData);
router.post("/start-quest", authMiddleware, startQuest);
router.post("/continue", authMiddleware, continueLearning);
router.post("/realm", authMiddleware, openRealm);
router.post("/audio", authMiddleware, playAudioStory);
router.post("/chat", authMiddleware, chatCharacter);
router.get("/guide/:guide", authMiddleware, getGuideMessage);

module.exports = router;