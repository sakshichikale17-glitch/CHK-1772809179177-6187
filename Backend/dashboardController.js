const User = require("./User");
const DashboardContent = require("./DashboardContent");

const getOrCreateDashboardContent = async () => {
  let content = await DashboardContent.findOne();
  if (!content) {
    content = await DashboardContent.create({});
  }
  return content;
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

    res.status(200).json({
      success: true,
      user,
      content
    });
  } catch (error) {
    console.error("Dashboard load error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard",
      error: error.message
    });
  }
};

const startQuest = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: { dharmaPoints: 5 },
        $set: { lastActive: "Today" }
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Today's quest started! +5 Dharma Points",
      user
    });
  } catch (error) {
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

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: { learningProgress: 3 },
        $set: { lastActive: "Today" }
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: `Continuing: ${sectionTitle}`,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to continue learning",
      error: error.message
    });
  }
};

const chatCharacter = async (req, res) => {
  try {
    const { character } = req.body;
    const content = await getOrCreateDashboardContent();

    const replies = content.chatReplies[character] || ["Keep learning with joy."];
    const reply = replies[Math.floor(Math.random() * replies.length)];

    res.status(200).json({
      success: true,
      character,
      reply
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get chat reply",
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
    res.status(500).json({
      success: false,
      message: "Failed to play audio",
      error: error.message
    });
  }
};

const openRealm = async (req, res) => {
  try {
    const { realmName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { currentRealm: realmName, lastActive: "Today" } },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: `Entering ${realmName} Realm`,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to open realm",
      error: error.message
    });
  }
};

module.exports = {
  getDashboardData,
  startQuest,
  continueLearning,
  chatCharacter,
  playAudioStory,
  openRealm
};