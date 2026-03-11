const mongoose = require("mongoose");
require("dotenv").config();

const Story = require("./Story");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    await Story.deleteMany({});

    await Story.insertMany([
      {
        storyId: "rama-1",
        slug: "birth-of-lord-rama",
        title: "Birth of Lord Rama",
        realm: "Ramayan Realm",
        chapter: 1,
        totalChapters: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rama_with_Bow_and_Arrow.jpg/800px-Rama_with_Bow_and_Arrow.jpg",
        narration: "King Dasharatha performed a sacred ritual, and soon Lord Rama was born in Ayodhya. The kingdom was filled with joy and celebration.",
        guideName: "Guru Vashistha",
        dialogue: "Rama’s birth brought truth, hope, and divine light to Ayodhya.",
        choiceQuestion: "What does Rama’s birth teach us?",
        choices: [
          "Truth brings peace",
          "Pride brings success",
          "Anger solves problems"
        ],
        value: "Truth",
        difficulty: "Easy",
        progress: 60,
        sanskrit: {
          word: "Satya (सत्य)",
          meaning: "Truth"
        },
        quiz: {
          question: "Where was Lord Rama born?",
          options: ["Ayodhya", "Mathura", "Lanka"],
          correctAnswer: "Ayodhya"
        }
      },
      {
        storyId: "rama-2",
        slug: "sita-swayamvar",
        title: "Sita Swayamvar",
        realm: "Ramayan Realm",
        chapter: 1,
        totalChapters: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Rama_breaks_bow.jpg/800px-Rama_breaks_bow.jpg",
        narration: "Many kings and princes came to lift the mighty bow of Lord Shiva, but only Rama could lift and break it with grace.",
        guideName: "Vishwamitra",
        dialogue: "True strength always walks with humility.",
        choiceQuestion: "Which quality helped Rama succeed?",
        choices: [
          "Humility",
          "Pride",
          "Fear"
        ],
        value: "Courage",
        difficulty: "Medium",
        progress: 0,
        sanskrit: {
          word: "Veer (वीर)",
          meaning: "Brave"
        },
        quiz: {
          question: "What did Rama lift in Sita Swayamvar?",
          options: ["A sword", "Shiva's bow", "A shield"],
          correctAnswer: "Shiva's bow"
        }
      },
      {
        storyId: "krishna-1",
        slug: "krishna-butter-leela",
        title: "Krishna Butter Leela",
        realm: "Krishna Leela Realm",
        chapter: 1,
        totalChapters: 4,
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Krishna_with_Butter.jpg/800px-Krishna_with_Butter.jpg",
        narration: "Little Krishna loved butter and spread happiness everywhere through his playful leelas.",
        guideName: "Mother Yashoda",
        dialogue: "Krishna’s joy teaches love, sweetness, and innocence.",
        choiceQuestion: "What does Krishna’s leela show?",
        choices: [
          "Joy",
          "Greed",
          "Fear"
        ],
        value: "Joy",
        difficulty: "Easy",
        progress: 20,
        sanskrit: {
          word: "Ananda (आनन्द)",
          meaning: "Joy"
        },
        quiz: {
          question: "What did Krishna love to eat?",
          options: ["Butter", "Rice", "Fruits"],
          correctAnswer: "Butter"
        }
      },
      {
        storyId: "abhimanyu-1",
        slug: "abhimanyu",
        title: "Abhimanyu and the Chakravyuh",
        realm: "Mahabharat Realm",
        chapter: 2,
        totalChapters: 5,
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kurukshetra_battle.jpg",
        narration: "The battlefield of Kurukshetra roared with warriors. Young Abhimanyu looked at the mighty Chakravyuh with courage.",
        guideName: "Krishna",
        dialogue: "A warrior must act with wisdom and courage.",
        choiceQuestion: "What should Abhimanyu do?",
        choices: [
          "Enter bravely",
          "Ask elders for guidance",
          "Observe the formation first"
        ],
        value: "Courage",
        difficulty: "Hard",
        progress: 40,
        sanskrit: {
          word: "Dharma (धर्म)",
          meaning: "Duty / righteousness"
        },
        quiz: {
          question: "Why is Abhimanyu remembered in this story?",
          options: [
            "He entered the Chakravyuh",
            "He built a palace",
            "He found treasure"
          ],
          correctAnswer: "He entered the Chakravyuh"
        }
      }
    ]);

    console.log("Story seed inserted successfully");
    process.exit();
  })
  .catch((error) => {
    console.log("Seed error:", error.message);
    process.exit();
  });