const mongoose = require("mongoose");

const dashboardContentSchema = new mongoose.Schema(
  {
    dailyWords: {
      type: [
        {
          word: String,
          meaning: String,
          pronunciation: String
        }
      ],
      default: [
        { word: "धर्म", meaning: "Duty / righteousness", pronunciation: "Dharma" },
        { word: "सत्य", meaning: "Truth", pronunciation: "Satya" },
        { word: "वीर", meaning: "Brave", pronunciation: "Veer" },
        { word: "आनन्द", meaning: "Joy", pronunciation: "Ananda" }
      ]
    },

    featuredStory: {
      slug: { type: String, default: "abhimanyu" },
      title: { type: String, default: "Abhimanyu and the Chakravyuh" },
      description: {
        type: String,
        default: "A brave story from Mahabharat."
      }
    },

    continueLearning: {
      type: [
        {
          title: String
        }
      ],
      default: [
        { title: "Abhimanyu and the Chakravyuh" },
        { title: "Krishna Butter Leela" },
        { title: "Birth of Lord Rama" }
      ]
    },

    audioStories: {
      type: [
        {
          title: String
        }
      ],
      default: [
        { title: "Abhimanyu and the Chakravyuh" },
        { title: "Krishna Butter Leela" }
      ]
    },

    recommended: {
      type: [String],
      default: [
        "Complete one Mahabharat story today",
        "Learn 2 new Sanskrit words",
        "Take a mini quiz and earn Dharma Points"
      ]
    },

    quests: {
      type: [String],
      default: [
        "Finish one story chapter",
        "Answer one quiz correctly",
        "Learn today’s Sanskrit word"
      ]
    },

    leaderboard: {
      type: [
        {
          name: String,
          points: Number
        }
      ],
      default: [
        { name: "Aarav", points: 220 },
        { name: "Diya", points: 180 },
        { name: "You", points: 0 }
      ]
    },

    badges: {
      type: [String],
      default: ["Story Star", "Sanskrit Learner", "Quest Hero"]
    },

    chatReplies: {
      Krishna: {
        type: [String],
        default: [
          "Knowledge is the greatest power. Learn a new Sanskrit word today!",
          "Wisdom grows when you stay calm and curious."
        ]
      },
      Hanuman: {
        type: [String],
        default: [
          "Be brave and complete today’s quest!",
          "Strength and devotion help you overcome every challenge."
        ]
      },
      Rama: {
        type: [String],
        default: [
          "Truth and kindness make every journey meaningful.",
          "Walk the path of dharma with courage."
        ]
      },
      Ganesha: {
        type: [String],
        default: [
          "Learning becomes easy when you stay patient.",
          "Start small, and wisdom will grow."
        ]
      }
    },

    guideMessages: {
      krishna: {
        type: String,
        default: "Krishna says: Knowledge is the greatest power. Learn a new Sanskrit word today!"
      },
      hanuman: {
        type: String,
        default: "Hanuman challenge: Complete today’s story and earn more Dharma Points!"
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DashboardContent", dashboardContentSchema);