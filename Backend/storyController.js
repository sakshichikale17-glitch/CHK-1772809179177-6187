const Story = require("./Story");
const User = require("./User");

const createDefaultStoryIfMissing = async (slug) => {
  let story = await Story.findOne({ slug });

  if (!story && slug === "abhimanyu") {
    story = await Story.create({
      slug: "abhimanyu",
      storyId: "abhimanyu-1",
      title: "Abhimanyu and the Chakravyuh",
      realm: "Mahabharat",
      chapter: 2,
      totalChapters: 5,
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kurukshetra_battle.jpg",
      narration: "The battlefield of Kurukshetra roared with warriors. Young Abhimanyu watched the mighty Chakravyuh formation.",
      guideName: "Krishna",
      dialogue: "Every warrior must choose with wisdom and courage.",
      choiceQuestion: "What should Abhimanyu do?",
      choices: [
        "Enter bravely",
        "Ask elders for guidance",
        "Observe the formation first"
      ],
      sanskrit: {
        word: "Dharma (धर्म)",
        meaning: "Duty / righteousness"
      },
      quiz: {
        question: "Why did Arjuna hesitate in battle?",
        options: ["Fear", "Compassion", "Laziness"],
        correctAnswer: "Compassion"
      },
      progress: 40,
      nextNarration: "Abhimanyu stepped forward toward the Chakravyuh, remembering the teachings of his elders.",
      valueTitle: "Courage",
      valueText: "Abhimanyu entered bravely despite danger. Courage means standing strong for dharma.",
      dharmaPoints: 10,
      gyanCoins: 5,
      characterName: "Hanuman",
      characterReply: "Courage grows when you take one small step with faith."
    });
  }

  return story;
};

const getStoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const story = await createDefaultStoryIfMissing(slug);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    res.status(200).json({
      success: true,
      story
    });
  } catch (error) {
    console.error("Get Story Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load story",
      error: error.message
    });
  }
};

const saveChoice = async (req, res) => {
  try {
    const { storyId, selectedChoice } = req.body;

    const story = await Story.findOne({ storyId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: {
          dharmaPoints: story.dharmaPoints,
          gyanCoins: story.gyanCoins
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Choice saved: ${selectedChoice}`,
      valueTitle: story.valueTitle,
      valueText: story.valueText,
      dharmaPoints: story.dharmaPoints,
      gyanCoins: story.gyanCoins,
      user
    });
  } catch (error) {
    console.error("Save Choice Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save choice",
      error: error.message
    });
  }
};

const saveQuiz = async (req, res) => {
  try {
    const { storyId, selectedAnswer } = req.body;

    const story = await Story.findOne({ storyId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    let message = "Good try! Keep learning.";
    let xpGain = 2;

    if (selectedAnswer === story.quiz.correctAnswer) {
      message = "Correct! +5 Gyan Coins";
      xpGain = 5;
    }

    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        gyanCoins: xpGain,
        quizzesCompleted: 1
      }
    });

    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    console.error("Save Quiz Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save quiz answer",
      error: error.message
    });
  }
};

const nextScene = async (req, res) => {
  try {
    const { storyId } = req.body;

    const story = await Story.findOne({ storyId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    const nextProgress = Math.min((story.progress || 40) + 20, 100);

    const updatedStory = await Story.findOneAndUpdate(
      { storyId },
      { progress: nextProgress, narration: story.nextNarration || story.narration },
      { new: true }
    );

    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        storiesCompleted: nextProgress === 100 ? 1 : 0
      }
    });

    res.status(200).json({
      success: true,
      message: "Next scene loaded successfully.",
      story: updatedStory
    });
  } catch (error) {
    console.error("Next Scene Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load next scene",
      error: error.message
    });
  }
};

const characterChat = async (req, res) => {
  try {
    const { storyId, question } = req.body;

    const story = await Story.findOne({ storyId });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    res.status(200).json({
      success: true,
      characterName: story.characterName || "Hanuman",
      question,
      reply: story.characterReply || "Courage grows when you take one small step with faith."
    });
  } catch (error) {
    console.error("Character Chat Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get character reply",
      error: error.message
    });
  }
};

module.exports = {
  getStoryBySlug,
  saveChoice,
  saveQuiz,
  nextScene,
  characterChat
};