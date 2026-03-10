const User = require("./User");

const getParentDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.role !== "Parent") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Parent account required."
      });
    }

    res.status(200).json({
      success: true,
      parent: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        interest: user.interest,
        lastActive: user.lastActive
      },
      child: {
        childName: user.childName,
        age: user.age,
        screenTime: user.screenTime,
        storiesCompleted: user.storiesCompleted,
        quizzesCompleted: user.quizzesCompleted,
        wordsLearned: user.wordsLearned,
        dharmaPoints: user.dharmaPoints,
        badgesEarned: user.badgesEarned,
        charactersUnlocked: user.charactersUnlocked,
        badges: user.badges,
        learningPlan: user.learningPlan
      }
    });
  } catch (error) {
    console.error("Parent dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const getScreenTime = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("childName screenTime");
    res.status(200).json({
      success: true,
      childName: user.childName,
      screenTime: user.screenTime
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const getBadges = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("childName badges badgesEarned");
    res.status(200).json({
      success: true,
      childName: user.childName,
      badgesEarned: user.badgesEarned,
      badges: user.badges
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const getLearningPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("childName learningPlan");
    res.status(200).json({
      success: true,
      childName: user.childName,
      learningPlan: user.learningPlan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

const getReport = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "childName storiesCompleted quizzesCompleted wordsLearned dharmaPoints badgesEarned screenTime lastActive"
    );

    res.status(200).json({
      success: true,
      report: {
        childName: user.childName,
        storiesCompleted: user.storiesCompleted,
        quizzesCompleted: user.quizzesCompleted,
        wordsLearned: user.wordsLearned,
        dharmaPoints: user.dharmaPoints,
        badgesEarned: user.badgesEarned,
        screenTime: user.screenTime,
        lastActive: user.lastActive
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  getParentDashboard,
  getScreenTime,
  getBadges,
  getLearningPlan,
  getReport
};