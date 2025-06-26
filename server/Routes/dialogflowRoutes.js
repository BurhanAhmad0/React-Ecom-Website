const express = require("express");
const Auth = require("../Middlewares/Auth.js");
const { chatbot } = require("../Controllers/dialogflowControllers.js");

const router = express.Router();

router.put("/chat", Auth, chatbot);

module.exports = router;
