require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const authRoutes = require("./authRoutes");
const parentRoutes = require("./parentRoutes");
const homeRoutes = require("./homeRoutes");
const storyRoutes = require("./storyRoutes");
const quizRoutes = require("./quizRoutes");
const progressRoutes = require("./progressRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const rewardRoutes = require("./rewardRoutes");

const app = express();

/* CONNECT DATABASE */
connectDB();

/* MIDDLEWARE */
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* API ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reward", rewardRoutes);

/* ROOT ROUTE */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 MythoVerse Backend Running",
    version: "1.0",
    endpoints: {
      auth: "/api/auth",
      parent: "/api/parent",
      home: "/api/home",
      dashboard: "/api/dashboard",
      stories: "/api/story",
      quiz: "/api/quiz",
      progress: "/api/progress",
      reward: "/api/reward"
    }
  });
});

/* HEALTH CHECK */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy"
  });
});

/* 404 HANDLER */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

/* GLOBAL ERROR HANDLER */
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* START SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("=================================");
  console.log("🚀 MythoVerse Server Running");
  console.log(`🌍 http://localhost:${PORT}`);
  console.log("=================================");
});