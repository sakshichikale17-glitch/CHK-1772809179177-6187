const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Explorer",
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["Child", "Parent", "Admin"],
      default: "Child"
    },
    age: {
      type: String,
      default: "8-12"
    },
    interest: {
      type: String,
      default: "Mythology"
    },

    dharmaPoints: {
      type: Number,
      default: 0
    },
    gyanCoins: {
      type: Number,
      default: 0
    },
    badgesEarned: {
      type: Number,
      default: 0
    },
    charactersUnlocked: {
      type: Number,
      default: 0
    },
    storiesCompleted: {
      type: Number,
      default: 0
    },
    quizzesCompleted: {
      type: Number,
      default: 0
    },
    wordsLearned: {
      type: Number,
      default: 0
    },
    learningProgress: {
      type: Number,
      default: 0
    },

    learningStreak: {
      type: Number,
      default: 0
    },
    xp: {
      type: Number,
      default: 0
    },
    currentLevel: {
      type: Number,
      default: 1
    },
    nextLevel: {
      type: Number,
      default: 2
    },
    xpNeeded: {
      type: Number,
      default: 100
    },
    progressPercent: {
      type: Number,
      default: 0
    },

    screenTime: {
      type: String,
      default: "0 mins"
    },
    lastActive: {
      type: String,
      default: "Today"
    },
    childName: {
      type: String,
      default: ""
    },
    currentRealm: {
      type: String,
      default: "Ramayan"
    },
    currentQuest: {
      type: String,
      default: "Complete 1 mythology story today"
    },

    badges: {
      type: [
        {
          icon: { type: String, default: "🏅" },
          name: { type: String, default: "" },
          description: { type: String, default: "" }
        }
      ],
      default: []
    },

    achievements: {
      type: [
        {
          title: { type: String, default: "" },
          description: { type: String, default: "" }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);