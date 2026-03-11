const User = require("./User");
const DashboardContent = require("./DashboardContent");

const getOrCreateDashboardContent = async () => {
  let content = await DashboardContent.findOne();

  if (!content) {
    content = await DashboardContent.create({});
  }

  return content;
};

const normalizeUserStats = async (user) => {
  user.progressPercent = Math.min(user.learningProgress || 0, 100);
  user.currentLevel = Math.max(1, Math.floor((user.xp || 0) / 100) + 1);
  user.nextLevel = user.currentLevel + 1;
  user.xpNeeded = Math.max((user.currentLevel * 100) - (user.xp || 0), 0);
  await user.save();
  return user;
};

const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const content = await getOrCreateDashboardContent();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    await normalizeUserStats(user);

    res.status(200).json({
      success: true,
      user,
      content
    });
  } catch (error) {
    console.error("Get Dashboard Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message
    });
  }
};

const startQuest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.dharmaPoints += 10;
    user.gyanCoins += 5;
    user.xp += 15;
    user.learningProgress = Math.min((user.learningProgress || 0) + 5, 100);
    user.currentQuest = "Quest started";
    user.lastActive = "Today";

    await normalizeUserStats(user);

    res.status(200).json({
      success: true,
      message: "Quest started! +10 Dharma Points, +5 Gyan Coins",
      user
    });
  } catch (error) {
    console.error("Start Quest Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to start quest",
      error: error.message
    });
  }
};

const continueLearning = async (req, res) => {
  try {
    const { sectionTitle } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.learningProgress = Math.min((user.learningProgress || 0) + 4, 100);
    user.xp += 10;
    user.lastActive = "Today";

    await normalizeUserStats(user);

    res.status(200).json({
      success: true,
      message: `Continuing ${sectionTitle}`,
      user
    });
  } catch (error) {
    console.error("Continue Learning Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to continue learning",
      error: error.message
    });
  }
};

const openRealm = async (req, res) => {
  try {
    const { realmName } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.currentRealm = realmName;
    user.lastActive = "Today";
    await user.save();

    res.status(200).json({
      success: true,
      message: `${realmName} realm opened successfully`,
      user
    });
  } catch (error) {
    console.error("Open Realm Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to open realm",
      error: error.message
    });
  }
};

const playAudioStory = async (req, res) => {
  try {
    const { storyName } = req.body;

    res.status(200).json({
      success: true,
      message: `Now playing: ${storyName}`
    });
  } catch (error) {
    console.error("Play Audio Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to play audio",
      error: error.message
    });
  }
};

const chatCharacter = async (req, res) => {
  try {
    const { character } = req.body;
    const content = await getOrCreateDashboardContent();

    const replyList = content.chatReplies?.[character] || ["Keep learning with joy and courage."];
    const reply = replyList[Math.floor(Math.random() * replyList.length)];

    res.status(200).json({
      success: true,
      character,
      reply
    });
  } catch (error) {
    console.error("Chat Character Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to chat with character",
      error: error.message
    });
  }
};

const getGuideMessage = async (req, res) => {
  try {
    const { guide } = req.params;
    const content = await getOrCreateDashboardContent();

    const message =
      content.guideMessages?.[guide] ||
      "Keep learning with courage and wisdom.";

    res.status(200).json({
      success: true,
      guide,
      message
    });
  } catch (error) {
    console.error("Guide Message Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load guide message",
      error: error.message
    });
  }
};

module.exports = {
  getDashboardData,
  startQuest,
  continueLearning,
  openRealm,
  playAudioStory,
  chatCharacter,
  getGuideMessage
};