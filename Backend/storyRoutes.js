const express = require("express");
const router = express.Router();

const authMiddleware = require("./authMiddleware");
const {
  getStoryBySlug,
  saveChoice,
  saveQuiz,
  nextScene,
  characterChat
} = require("./storyController");

router.get("/:slug", authMiddleware, getStoryBySlug);
router.post("/save-choice", authMiddleware, saveChoice);
router.post("/save-quiz", authMiddleware, saveQuiz);
router.post("/next-scene", authMiddleware, nextScene);
router.post("/character-chat", authMiddleware, characterChat);

module.exports = router;