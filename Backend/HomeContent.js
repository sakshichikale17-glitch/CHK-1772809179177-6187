const mongoose = require("mongoose");

const homeContentSchema = new mongoose.Schema(
  {
    heroTitle: {
      type: String,
      default: "Welcome to MythoVerse"
    },
    heroSubtitle: {
      type: String,
      default: "MythoVerse is an interactive learning platform where children explore Indian mythology, traditional kathas, moral values, and basic Sanskrit through fun stories, mythological characters, gamified learning, and magical story worlds."
    },
    stats: {
      storyWorlds: { type: String, default: "6+" },
      learningMode: { type: String, default: "3-in-1" },
      experience: { type: String, default: "100%" }
    },
    featuredStory: {
      title: { type: String, default: "Abhimanyu and the Chakravyuh" },
      description: {
        type: String,
        default: "Children explore the story of Abhimanyu and learn about bravery, wisdom, and difficult choices through an interactive journey."
      },
      tags: {
        type: [String],
        default: ["Courage", "Wisdom", "Responsibility"]
      }
    },
    sanskritWord: {
      word: { type: String, default: "धर्म" },
      meaning: { type: String, default: "Dharma — Duty" },
      pronunciation: { type: String, default: "Pronunciation: Dhar-ma" }
    },
    testimonials: {
      type: [String],
      default: [
        "My child loves learning Sanskrit here. The platform makes mythology so fun and colorful.",
        "Amazing way to teach mythology. The stories, rewards, and learning activities keep children interested.",
        "MythoVerse feels like a magical learning world where culture and technology come together beautifully."
      ]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("HomeContent", homeContentSchema);