const { SessionsClient } = require("dialogflow");

const credentials = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"), // important!
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_CERT_URL,
};

const projectId = process.env.PROJECT_ID;
const sessionClient = new SessionsClient({
  credentials,
});

const chatbot = async (req, res) => {
  const { message, sessionId = "default-session" } = req.body;

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
