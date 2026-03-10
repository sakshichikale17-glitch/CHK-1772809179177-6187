const express = require("express");
const authMiddleware = require("./authMiddleware");
const {
  getParentDashboard,
  getScreenTime,
  getBadges,
  getLearningPlan,
  getReport
} = require("./parentController");

const router = express.Router();

router.get("/dashboard", authMiddleware, getParentDashboard);
router.get("/screen-time", authMiddleware, getScreenTime);
router.get("/badges", authMiddleware, getBadges);
router.get("/learning-plan", authMiddleware, getLearningPlan);
router.get("/report", authMiddleware, getReport);

module.exports = router;