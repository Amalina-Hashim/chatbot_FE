import React, { useState } from "react";
import { sendMessage } from "../api";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [audioPath, setAudioPath] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    const response = await sendMessage(message);
    setChatLog([
      ...chatLog,
      { sender: "user", text: message },
      { sender: "bot", text: response.choices[0].message.content },
    ]);
    setMessage("");
    setAudioPath(response.audioPath);
    setLoading(false);
  };

  const handlePlayAudio = () => {
    const audio = new Audio(
      `https://chatbot-widget88.azurewebsites.net/${audioPath}`
    );
    audio.play();
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        {chatLog.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 ${
              entry.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded ${
                entry.sender === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {entry.text}
            </span>
          </div>
        ))}
        {loading && (
          <div className="text-left mb-2">
            <span className="inline-block p-2 rounded bg-gray-100 animate-pulse">
              ...
            </span>
          </div>
        )}
      </div>
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-r"
          disabled={loading}
        >
          Send
        </button>
      </div>
      {audioPath && (
        <button
          onClick={handlePlayAudio}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Play Audio Response
        </button>
      )}
    </div>
  );
};

export default ChatBot;
