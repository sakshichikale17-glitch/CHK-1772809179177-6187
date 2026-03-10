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

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/story", storyRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MythoVerse Backend Running 🚀"
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 MythoVerse server running on port ${PORT}`);
});