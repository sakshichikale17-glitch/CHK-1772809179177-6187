const User = require("./User");

const fallbackRewards = [
  { icon: "🏅", title: "Story Star Badge", description: "Complete 5 stories", cost: 0, unlocked: true },
  { icon: "🦚", title: "Krishna Avatar", description: "Unlock with 100 coins", cost: 100, unlocked: false },
  { icon: "📜", title: "Wisdom Scroll", description: "Reach 200 Dharma Points", cost: 0, unlocked: false },
  { icon: "👑", title: "Mythic Crown", description: "Earn 5 badges", cost: 0, unlocked: false }
];

const fallbackBadges = [
  { name: "Story Star", unlocked: true },
  { name: "Sanskrit Learner", unlocked: true },
  { name: "Quest Hero", unlocked: true },
  { name: "Quiz Master", unlocked: false },
  { name: "Realm Explorer", unlocked: false }
];

const fallbackMissions = [
  { title: "Complete one story", description: "Finish any one story chapter today.", progress: 70 },
  { title: "Learn 2 Sanskrit words", description: "Study and revise 2 Sanskrit words.", progress: 50 },
  { title: "Finish one quiz", description: "Answer one mini quiz correctly.", progress: 20 }
];

const fallbackShop = [
  { title: "Golden Badge Frame", description: "Decorate your profile badges.", cost: 40 },
  { title: "Hanuman Character Unlock", description: "Unlock a special character chat.", cost: 80 },
  { title: "Reward Chest", description: "Contains surprise coins and badge chance.", cost: 60 }
];

const computeRank = (points) => {
  if (points >= 500) {
    return {
      name: "Wisdom Guardian",
      pointsText: `${points} pts`,
      nextText: "You reached one of the highest reward ranks."
    };
  }

  if (points >= 300) {
    return {
      name: "Dharma Champion",
      pointsText: `${points} pts`,
      nextText: `Earn ${500 - points} more Dharma Points to unlock Wisdom Guardian rank.`
    };
  }

  if (points >= 200) {
    return {
      name: "Quest Hero",
      pointsText: `${points} pts`,
      nextText: `Earn ${300 - points} more Dharma Points to unlock Dharma Champion rank.`
    };
  }

  if (points >= 100) {
    return {
      name: "Rising Seeker",
      pointsText: `${points} pts`,
      nextText: `Earn ${200 - points} more Dharma Points to unlock Quest Hero rank.`
    };
  }

  return {
    name: "Beginner Seeker",
    pointsText: `${points} pts`,
    nextText: `Earn ${100 - points} more Dharma Points to unlock Rising Seeker rank.`
  };
};

const buildRewardsPayload = (user) => {
  const points = user.dharmaPoints || 0;
  const coins = user.gyanCoins || 0;
  const badgesEarned = user.badgesEarned || 0;
  const storiesCompleted = user.storiesCompleted || 0;
  const quizzesCompleted = user.quizzesCompleted || 0;
  const wordsLearned = user.wordsLearned || 0;
  const charactersUnlocked = user.charactersUnlocked || 0;

  const rewards = fallbackRewards.map((reward) => {
    if (reward.title === "Story Star Badge") {
      return { ...reward, unlocked: storiesCompleted >= 5 };
    }
    if (reward.title === "Krishna Avatar") {
      return { ...reward, unlocked: charactersUnlocked >= 1 || coins >= 100 };
    }
    if (reward.title === "Wisdom Scroll") {
      return { ...reward, unlocked: points >= 200 };
    }
    if (reward.title === "Mythic Crown") {
      return { ...reward, unlocked: badgesEarned >= 5 };
    }
    return reward;
  });

  const badges = fallbackBadges.map((badge) => {
    if (badge.name === "Story Star") {
      return { ...badge, unlocked: storiesCompleted >= 5 };
    }
    if (badge.name === "Sanskrit Learner") {
      return { ...badge, unlocked: wordsLearned >= 10 };
    }
    if (badge.name === "Quest Hero") {
      return { ...badge, unlocked: points >= 100 };
    }
    if (badge.name === "Quiz Master") {
      return { ...badge, unlocked: quizzesCompleted >= 5 };
    }
    if (badge.name === "Realm Explorer") {
      return { ...badge, unlocked: storiesCompleted >= 10 };
    }
    return badge;
  });

  const missions = [
    {
      title: "Complete one story",
      description: "Finish any one story chapter today.",
      progress: Math.min(storiesCompleted * 20, 100)
    },
    {
      title: "Learn 2 Sanskrit words",
      description: "Study and revise 2 Sanskrit words.",
      progress: Math.min(wordsLearned * 10, 100)
    },
    {
      title: "Finish one quiz",
      description: "Answer one mini quiz correctly.",
      progress: Math.min(quizzesCompleted * 20, 100)
    }
  ];

  const history = [
    { title: "Story Progress Reward", points: `+${storiesCompleted * 10} Dharma Points` },
    { title: "Quiz Progress Reward", points: `+${quizzesCompleted * 5} Gyan Coins` },
    { title: "Current Coin Balance", points: `${coins} Gyan Coins` }
  ];

  const rank = computeRank(points);

  return {
    user: {
      name: user.name,
      dharmaPoints: points,
      gyanCoins: coins,
      badgesEarned: badgesEarned,
      charactersUnlocked: charactersUnlocked,
      learningProgress: user.learningProgress || 0
    },
    rewards,
    badges,
    missions,
    shop: fallbackShop,
    history,
    rank,
    specialReward:
      storiesCompleted >= 3
        ? "You completed 3+ stories. A surprise badge is close to unlocking."
        : "Complete 3 stories this week to unlock a surprise badge."
  };
};

const getRewards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json(buildRewardsPayload(user));
  } catch (error) {
    console.error("Get Rewards Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load rewards",
      error: error.message
    });
  }
};

const claimDailyReward = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: {
          dharmaPoints: 5,
          gyanCoins: 3,
          xp: 8,
          learningProgress: 2,
          learningStreak: 1
        }
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    user.progressPercent = Math.min(user.learningProgress || 0, 100);
    user.currentLevel = Math.max(1, Math.floor((user.xp || 0) / 100) + 1);
    user.nextLevel = user.currentLevel + 1;
    user.xpNeeded = Math.max((user.currentLevel * 100) - (user.xp || 0), 0);
    await user.save();

    return res.status(200).json({
      message: "Daily reward claimed successfully!",
      ...buildRewardsPayload(user)
    });
  } catch (error) {
    console.error("Claim Daily Reward Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to claim daily reward",
      error: error.message
    });
  }
};

const claimReward = async (req, res) => {
  try {
    const { rewardTitle } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (rewardTitle === "Story Star Badge") {
      if ((user.storiesCompleted || 0) < 5) {
        return res.status(400).json({
          success: false,
          message: "Complete 5 stories first."
        });
      }

      user.badgesEarned += 1;
    } else if (rewardTitle === "Wisdom Scroll") {
      if ((user.dharmaPoints || 0) < 200) {
        return res.status(400).json({
          success: false,
          message: "Reach 200 Dharma Points first."
        });
      }

      user.badgesEarned += 1;
    } else if (rewardTitle === "Mythic Crown") {
      if ((user.badgesEarned || 0) < 5) {
        return res.status(400).json({
          success: false,
          message: "Earn 5 badges first."
        });
      }

      user.charactersUnlocked += 1;
    } else {
      user.badgesEarned += 1;
    }

    await user.save();

    return res.status(200).json({
      message: `${rewardTitle} claimed successfully!`,
      ...buildRewardsPayload(user)
    });
  } catch (error) {
    console.error("Claim Reward Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to claim reward",
      error: error.message
    });
  }
};

const buyReward = async (req, res) => {
  try {
    const { rewardTitle, cost } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const numericCost = Number(cost) || 0;

    if ((user.gyanCoins || 0) < numericCost) {
      return res.status(400).json({
        success: false,
        message: "Not enough Gyan Coins."
      });
    }

    user.gyanCoins -= numericCost;

    if (rewardTitle.toLowerCase().includes("avatar") || rewardTitle.toLowerCase().includes("unlock")) {
      user.charactersUnlocked += 1;
    } else {
      user.badgesEarned += 1;
    }

    await user.save();

    return res.status(200).json({
      message: `${rewardTitle} unlocked successfully!`,
      ...buildRewardsPayload(user)
    });
  } catch (error) {
    console.error("Buy Reward Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to buy reward",
      error: error.message
    });
  }
};

module.exports = {
  getRewards,
  claimDailyReward,
  claimReward,
  buyReward
};