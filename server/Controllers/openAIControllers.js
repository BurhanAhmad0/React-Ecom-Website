const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const aiChatbot = async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support agent.",
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to fetch response from OpenAI" });
  }
};

module.exports = {
  aiChatbot,
};
