const express = require("express");
const { getHomeContent } = require("./homeController");

const router = express.Router();

router.get("/", getHomeContent);

module.exports = router;