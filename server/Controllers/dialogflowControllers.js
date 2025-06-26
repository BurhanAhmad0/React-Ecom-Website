const { SessionsClient } = require("dialogflow");

const projectId = process.env.PROJECT_ID;

const chatbot = async (req, res) => {
  const { message, sessionId = "default-session" } = req.body;

  const sessionClient = new SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: "en-US",
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    const botReply = result.fulfillmentText;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Dialogflow Error:", error);
    res.status(500).json({ reply: "Bot is not responding right now." });
  }
};

module.exports = {
  chatbot,
};
