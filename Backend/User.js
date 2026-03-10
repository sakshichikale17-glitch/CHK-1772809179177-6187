const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    phone: {
      type: String,
      default: ""
    },
    role: {
      type: String,
      enum: ["Child", "Parent", "Admin"],
      required: true
    },
    age: {
      type: String,
      default: ""
    },
    interest: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      required: true
    },

    dharmaPoints: {
      type: Number,
      default: 240
    },
    gyanCoins: {
      type: Number,
      default: 120
    },
    badgesEarned: {
      type: Number,
      default: 8
    },
    charactersUnlocked: {
      type: Number,
      default: 5
    },
    storiesCompleted: {
      type: Number,
      default: 12
    },
    quizzesCompleted: {
      type: Number,
      default: 7
    },
    wordsLearned: {
      type: Number,
      default: 25
    },
    learningProgress: {
      type: Number,
      default: 72
    },
    currentQuest: {
      type: String,
      default: "Complete 1 mythology story today"
    },
    currentRealm: {
      type: String,
      default: "Mahabharat"
    },
    childName: {
      type: String,
      default: "Little Explorer"
    },
    screenTime: {
      type: String,
      default: "45 mins"
    },
    lastActive: {
      type: String,
      default: "Today"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);