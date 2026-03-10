const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    storyId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    realm: {
      type: String,
      default: "Mythology"
    },
    chapter: {
      type: Number,
      default: 1
    },
    totalChapters: {
      type: Number,
      default: 5
    },
    image: {
      type: String,
      default: ""
    },
    narration: {
      type: String,
      default: ""
    },
    guideName: {
      type: String,
      default: "Guide"
    },
    dialogue: {
      type: String,
      default: ""
    },
    choiceQuestion: {
      type: String,
      default: ""
    },
    choices: {
      type: [String],
      default: []
    },
    sanskrit: {
      word: {
        type: String,
        default: ""
      },
      meaning: {
        type: String,
        default: ""
      }
    },
    quiz: {
      question: {
        type: String,
        default: ""
      },
      options: {
        type: [String],
        default: []
      },
      correctAnswer: {
        type: String,
        default: ""
      }
    },
    progress: {
      type: Number,
      default: 40
    },
    nextNarration: {
      type: String,
      default: ""
    },
    valueTitle: {
      type: String,
      default: "Courage"
    },
    valueText: {
      type: String,
      default: "A value was learned through your choice."
    },
    dharmaPoints: {
      type: Number,
      default: 10
    },
    gyanCoins: {
      type: Number,
      default: 5
    },
    characterName: {
      type: String,
      default: "Hanuman"
    },
    characterReply: {
      type: String,
      default: "Courage grows when you take one small step with faith."
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);