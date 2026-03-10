const HomeContent = require("./HomeContent");

const getHomeContent = async (req, res) => {
  try {
    let content = await HomeContent.findOne();

    if (!content) {
      content = await HomeContent.create({});
    }

    res.status(200).json({
      success: true,
      content
    });
  } catch (error) {
    console.error("Home Content Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load home content",
      error: error.message
    });
  }
};

module.exports = {
  getHomeContent
};