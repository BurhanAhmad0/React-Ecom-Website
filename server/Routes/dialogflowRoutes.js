const express = require("express");
const { chatbot } = require("../Controllers/dialogflowControllers.js");

const router = express.Router();

router.put("/chat", chatbot);

module.exports = router;
