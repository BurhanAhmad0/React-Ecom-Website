import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import Footer from "./Footer";

import ChatbotIcon from "../assets/icons/chatbot.svg";

const HomeLayout = () => {
  const [isChatbotOpen, setisChatbotOpen] = useState(false);
  const [userMessage, setuserMessage] = useState("");
  const [ChatLog, setChatLog] = useState([]);

  const handleChange = (e) => {
    const message = e.target.value;
    setuserMessage(message);
  };

  const sendMessageToAI = async () => {
    if (!userMessage.trim()) return;

    const newChatLog = [...ChatLog, { role: "user", content: userMessage }];
    setChatLog(newChatLog);
    setuserMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/openai/chat`,
        { userMessage }
      );
      console.log(res);
      setChatLog([...newChatLog, { role: "bot", content: res.data.reply }]);
    } catch (err) {
      console.error(err);
      setChatLog([
        ...newChatLog,
        { role: "bot", content: "Error contacting AI." },
      ]);
    }
  };

  return (
    <>
      <header className="relative bgImage text-white">
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none"></div>
        <Navbar bgColor="bg-transparent" />
        <HeroSection />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>

      <div className="aiChatbox fixed bottom-8 right-8 flex flex-row-reverse items-end gap-2">
        <div
          onClick={() => setisChatbotOpen(!isChatbotOpen)}
          id="chatbox"
          className="cursor-pointer w-20 h-20 bg-blue-600/75 rounded-full flex items-center justify-center"
        >
          <img className="w-1/2" src={ChatbotIcon} alt="" />
        </div>
        {isChatbotOpen && (
          <div className="chatbox bg-blue-500 text-white rounded-lg p-4 h-96 flex flex-col justify-end">
            <div className="messages h-full flex flex-col justify-end">
              <div
                id="userMessages"
                className="p-2 bg-blue-300/50 rounded-lg mb-2"
              >
                <span className="font-bold text-blue-600">{"USER > "}</span>
                Hi there!
              </div>
              <div
                id="botMessages"
                className="p-2 bg-gray-300/50 rounded-lg mb-2"
              >
                <span className="font-bold text-blue-900">{"BOT > "}</span>
                Welcome! How can I help you?
              </div>
            </div>
            <div className="input">
              <input
                onChange={(e) => handleChange(e)}
                className="outline-none py-2 border border-white rounded-lg p-2 mr-2"
                value={userMessage}
                type="text"
                id="input"
                placeholder="Ask me anything..."
              />
              <button
                className="bg-blue-600 hover:bg-blue-600/65 transition-all duration-300 px-5 py-2 cursor-pointer text-white rounded-lg"
                onClick={() => {
                  sendMessageToAI();
                }}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeLayout;
