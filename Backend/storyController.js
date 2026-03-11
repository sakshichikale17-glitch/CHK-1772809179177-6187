const Story = require("./Story");
const User = require("./User");

const defaultStories = [
  {
    slug: "abhimanyu",
    storyId: "abhimanyu-1",
    title: "Abhimanyu and the Chakravyuh",
    realm: "Mahabharat Realm",
    chapter: 2,
    totalChapters: 5,
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kurukshetra_battle.jpg",
    narration:
      "The battlefield of Kurukshetra thundered with conch shells and marching warriors. Young Abhimanyu stood before the mighty Chakravyuh, determined to follow dharma with courage.",
    guideName: "Krishna",
    dialogue:
      "Courage is not the absence of fear. It is moving forward with wisdom and duty.",
    choiceQuestion: "What should Abhimanyu do first?",
    choices: [
      "Enter bravely",
      "Ask elders for guidance",
      "Observe the formation first"
    ],
    progress: 40,
    sanskrit: {
      word: "धर्म (Dharma)",
      meaning: "Duty / righteousness"
    },
    quiz: {
      question: "Why is Abhimanyu remembered in this story?",
      options: [
        "He entered the Chakravyuh bravely",
        "He built a palace",
        "He found hidden treasure"
      ],
      correctAnswer: "He entered the Chakravyuh bravely"
    },
    nextNarration:
      "Abhimanyu stepped forward toward the Chakravyuh, remembering the guidance of his elders and his duty as a warrior.",
    valueTitle: "Courage",
    valueText:
      "Abhimanyu chose to act with courage. True courage means standing firm for what is right.",
    dharmaPoints: 10,
    gyanCoins: 5,
    characterName: "Hanuman",
    characterReply:
      "Courage grows when you move forward with faith and wisdom."
  },
  {
    slug: "birth-of-rama",
    storyId: "birth-of-rama-1",
    title: "Birth of Lord Rama",
    realm: "Ramayan Realm",
    chapter: 1,
    totalChapters: 4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Rama_birth.jpg/1200px-Rama_birth.jpg",
    narration:
      "Ayodhya glowed with joy as the birth of Lord Rama filled the kingdom with peace, celebration, and hope.",
    guideName: "Vashistha",
    dialogue:
      "A noble life begins with blessings, love, and dharma.",
    choiceQuestion: "What filled Ayodhya during Rama's birth?",
    choices: [
      "Joy and celebration",
      "Fear and worry",
      "Silence and sadness"
    ],
    progress: 25,
    sanskrit: {
      word: "आनन्द (Ananda)",
      meaning: "Joy / happiness"
    },
    quiz: {
      question: "In which city was Rama born?",
      options: ["Ayodhya", "Mathura", "Dwarka"],
      correctAnswer: "Ayodhya"
    },
    nextNarration:
      "The people of Ayodhya celebrated with devotion, music, and happiness as the future protector of dharma was born.",
    valueTitle: "Joy",
    valueText:
      "Divine joy spreads hope, peace, and love among all people.",
    dharmaPoints: 8,
    gyanCoins: 4,
    characterName: "Rama",
    characterReply:
      "A calm heart and kind actions create lasting joy."
  },
  {
    slug: "sita-swayamvar",
    storyId: "sita-swayamvar-1",
    title: "Sita Swayamvar",
    realm: "Ramayan Realm",
    chapter: 2,
    totalChapters: 4,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Rama_breaking_the_bow.jpg/1200px-Rama_breaking_the_bow.jpg",
    narration:
      "Kings and warriors gathered at Mithila, but only Rama could lift the mighty bow and win Sita's hand.",
    guideName: "Janaka",
    dialogue:
      "True strength is guided by humility and grace.",
    choiceQuestion: "What quality made Rama stand out?",
    choices: [
      "Humility",
      "Pride",
      "Anger"
    ],
    progress: 35,
    sanskrit: {
      word: "बल (Bala)",
      meaning: "Strength"
    },
    quiz: {
      question: "What did Rama lift in the swayamvar?",
      options: ["A sword", "A divine bow", "A crown"],
      correctAnswer: "A divine bow"
    },
    nextNarration:
      "Rama's strength and calmness made the grand swayamvar a divine moment of destiny.",
    valueTitle: "Humility",
    valueText:
      "Great strength shines brightest when guided by humility.",
    dharmaPoints: 8,
    gyanCoins: 4,
    characterName: "Sita",
    characterReply:
      "Grace and humility are more powerful than pride."
  }
];

const seedStoriesIfNeeded = async () => {
  const count = await Story.countDocuments();
  if (count === 0) {
    await Story.insertMany(defaultStories);
  }
};

const getStoryBySlug = async (req, res) => {
  try {
    await seedStoriesIfNeeded();

    const { slug } = req.params;
    const story = await Story.findOne({ slug });

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

    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        dharmaPoints: story.dharmaPoints || 10,
        gyanCoins: story.gyanCoins || 5
      }
    });

    res.status(200).json({
      success: true,
      message: `Choice saved: ${selectedChoice}`,
      valueTitle: story.valueTitle,
      valueText: story.valueText,
      dharmaPoints: story.dharmaPoints || 10,
      gyanCoins: story.gyanCoins || 5
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

    let message = "Nice try. Keep learning and try again.";
    let coins = 2;

    if (selectedAnswer === story.quiz.correctAnswer) {
      message = "Correct! +5 Gyan Coins";
      coins = 5;
    }

    await User.findByIdAndUpdate(req.user.id, {
      $inc: {
        gyanCoins: coins,
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

    const nextProgress = Math.min((story.progress || 20) + 20, 100);

    const updatedStory = await Story.findOneAndUpdate(
      { storyId },
      {
        progress: nextProgress,
        narration: story.nextNarration || story.narration
      },
      { new: true }
    );

    if (nextProgress === 100) {
      await User.findByIdAndUpdate(req.user.id, {
        $inc: {
          storiesCompleted: 1,
          dharmaPoints: 10
        }
      });
    }

    res.status(200).json({
      success: true,
      message: "Next scene loaded successfully.",
      story: updatedStory,
      progress: updatedStory.progress,
      nextNarration: updatedStory.narration
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
    const { storyId } = req.body;

    const story = await Story.findOne({ storyId });
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found"
      });
    }

    res.status(200).json({
      success: true,
      characterName: story.characterName || story.guideName || "Guide",
      reply: story.characterReply || "Stay brave, stay kind, and keep learning."
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