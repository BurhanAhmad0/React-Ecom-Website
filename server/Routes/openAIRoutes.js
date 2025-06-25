const express = require("express");
const Auth = require("../Middlewares/Auth.js");
const { aiChatbot } = require("../Controllers/openAIControllers.js");

const router = express.Router();

router.put("/chat", aiChatbot);

module.exports = router;
