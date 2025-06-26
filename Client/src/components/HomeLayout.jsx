import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar.jsx";
import HeroSection from "./HeroSection.jsx";
import Footer from "./Footer.jsx";

import ChatbotIcon from "../assets/icons/chatbot.svg";
import UserIcon from "../assets/icons/userSvg.svg";

const HomeLayout = () => {
  const [isChatbotOpen, setisChatbotOpen] = useState(false);
  const [userMessage, setuserMessage] = useState("");
  const [ChatLog, setChatLog] = useState([]);

  const handleChange = (e) => {
    const message = e.target.value;
    setuserMessage(message);
  };

  const sendMessageToAI = async () => {
    if (!userMessage) return;

    const message = { sender: "user", text: userMessage };
    setChatLog((prev) => [...prev, message]);
    setuserMessage("");

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE}/dialogflow/chat`,
        {
          message: userMessage,
        },
        { withCredentials: true }
      );

      const botMessage = { sender: "bot", text: response.data.reply };
      setChatLog((prev) => [...prev, botMessage]);
    } catch {
      setChatLog((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." },
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
          className="cursor-pointer w-10 lg:w-20 h-10 lg:h-20 bg-blue-600/75 rounded-full flex items-center justify-center"
        >
          <img className="w-1/2" src={ChatbotIcon} alt="" />
        </div>
        {isChatbotOpen && (
          <div className="chatbox bg-blue-500 text-white rounded-lg p-4 w-64 lg:w-80 h-96 flex flex-col justify-end">
            <div className="messages h-full flex flex-col justify-end">
              {!ChatLog || ChatLog.length === 0 ? (
                <div
                  id="userMessages"
                  className="p-2 mb-2 text-center text-gray-300/70"
                >
                  Messages will show up here...
                </div>
              ) : (
                ChatLog.map((entry, index) => (
                  <div
                    key={index}
                    id={
                      entry.sender === "user" ? "userMessages" : "botMessages"
                    }
                    className={`p-2 mb-2 rounded-lg text-wrap flex gap-2 ${
                      entry.sender === "user"
                        ? "bg-blue-300/50 text-blue-600"
                        : "bg-gray-300/50 text-blue-900"
                    }`}
                  >
                    {/* <span className="font-bold">{entry.sender}</span>:{" "} */}
                    {entry.sender === "user" && (
                      <img className="w-6" src={UserIcon} alt="" />
                    )}
                    {entry.sender === "bot" && <img src={ChatbotIcon} alt="" />}
                    {entry.text}
                  </div>
                ))
              )}
            </div>
            <div className="input flex flex-col gap-2 lg:block">
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
