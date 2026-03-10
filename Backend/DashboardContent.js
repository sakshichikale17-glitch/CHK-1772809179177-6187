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
        { word: "धर्म", meaning: "Duty / Righteousness", pronunciation: "Dhar-ma" },
        { word: "ज्ञान", meaning: "Knowledge", pronunciation: "Gyaa-n" },
        { word: "शांति", meaning: "Peace", pronunciation: "Shaan-ti" },
        { word: "प्रेम", meaning: "Love", pronunciation: "Pre-m" },
        { word: "साहस", meaning: "Courage", pronunciation: "Saa-has" },
        { word: "मित्र", meaning: "Friend", pronunciation: "Mi-tra" }
      ]
    },
    featuredStory: {
      type: {
        title: { type: String, default: "The Courage of Hanuman" },
        description: {
          type: String,
          default: "Discover Hanuman’s bravery, devotion, and wisdom through an interactive adventure where your choices guide the journey."
        }
      },
      default: {}
    },
    continueLearning: {
      type: [
        {
          title: String
        }
      ],
      default: [
        { title: "Abhimanyu and the Chakravyuh" },
        { title: "Sanskrit Word Practice" },
        { title: "Ramayan Quiz Challenge" }
      ]
    },
    audioStories: {
      type: [
        {
          title: String
        }
      ],
      default: [
        { title: "Krishna and Butter Story" },
        { title: "Rama in the Forest" },
        { title: "Little Ganesha Story" }
      ]
    },
    recommended: {
      type: [String],
      default: [
        "Krishna Leela Adventure",
        "Mahabharat Hero Quiz",
        "Fruits in Sanskrit Activity"
      ]
    },
    quests: {
      type: [String],
      default: [
        "Complete 1 mythology story today",
        "Learn 2 Sanskrit words",
        "Earn 20 Dharma Points"
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
        { name: "Aarav", points: 350 },
        { name: "Siya", points: 320 },
        { name: "Vivaan", points: 290 }
      ]
    },
    chatReplies: {
      type: {
        Krishna: {
          type: [String],
          default: [
            "Always choose wisdom and kindness.",
            "True strength comes from calm thinking."
          ]
        },
        Hanuman: {
          type: [String],
          default: [
            "Be brave, strong, and helpful.",
            "Courage grows when you help others."
          ]
        },
        Rama: {
          type: [String],
          default: [
            "Walk on the path of truth and dharma.",
            "Patience and truth make you strong."
          ]
        },
        Ganesha: {
          type: [String],
          default: [
            "Learn with patience and positivity.",
            "Every small lesson leads to great wisdom."
          ]
        }
      },
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DashboardContent", dashboardContentSchema);