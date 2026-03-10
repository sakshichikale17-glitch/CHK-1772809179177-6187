const express = require("express");
const router = express.Router();

router.get("/abhimanyu", (req, res) => {
  res.json({
    success: true,
    story: {
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
        options: ["Fear", "Compassion", "Laziness"]
      },
      progress: 40
    }
  });
});

router.post("/save-choice", (req, res) => {
  res.json({
    success: true,
    valueTitle: "Courage",
    valueText: "Abhimanyu entered bravely despite danger. Courage means standing strong for dharma.",
    dharmaPoints: 10,
    gyanCoins: 5
  });
});

router.post("/save-quiz", (req, res) => {
  const { selectedAnswer } = req.body;

  if (selectedAnswer === "Compassion") {
    return res.json({
      success: true,
      message: "Correct! +5 Gyan Coins"
    });
  }

  res.json({
    success: true,
    message: "Good try! Arjuna hesitated due to compassion."
  });
});

router.post("/next-scene", (req, res) => {
  res.json({
    success: true,
    progress: 60,
    nextNarration: "Abhimanyu stepped forward toward the Chakravyuh, remembering the teachings of his elders."
  });
});

router.post("/character-chat", (req, res) => {
  res.json({
    success: true,
    characterName: "Hanuman",
    reply: "Courage grows when you take one small step with faith."
  });
});

module.exports = router;