import { SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { BASEURL } from "../config";
import { userGetChats } from "../services/auth/loginAuth";
import dayjs from "dayjs";

const socket =
  location.hostname === "localhost"
    ? io(BASEURL)
    : io("/", { path: "/api/socket.io" });

const ChatPage = () => {
  const userId = useSelector((state) => state.user?._id);
  const targetId = "6867d14773c3c0b10331d8c6";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("recived message", ({ text, userId, chattime }) => {
      setMessages((prev) => [...prev, { text, userId, chattime }]);
    });
  }, []);

  useEffect(() => {
    if (userId && targetId) {
      socket.emit("join room", { userId, targetId });
    }
  }, [userId, targetId]);

  const handleMessage = () => {
    if (input.trimStart()) {
      socket.emit("join room", { userId, targetId });
      socket.emit("chat message", { userId, targetId, text: input });
    }
    setInput("");
  };

  useEffect(() => {
    const fetchusersChats = async () => {
      try {
        const res = await userGetChats();

        const chatMessage = res?.data?.messages?.map((msg) => {
          return {
            text: msg?.text,
            userId: msg?.sender?._id,
            chattime: msg?.createdAt,
          };
        });
        setMessages(chatMessage);
      } catch (error) {
        console.log(error);
      }
    };
    fetchusersChats();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="w-[500px] h-[500px] bg-white shadow-xl rounded-2xl flex flex-col overflow-hidden border border-gray-300 relative">
        <div className="bg-green-500 text-white text-lg font-semibold p-4">
          Chat with Support
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 flex flex-col">
          {messages.map((msg, i) => {
            const isOwn = msg?.userId === userId;
            return (
              <div
                key={i}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-xs break-words shadow relative ${
                    isOwn
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-200 text-black rounded-bl-none"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className="text-[10px] mt-1 text-right opacity-70">
                    {dayjs(msg?.chattime).format("hh:mm A")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-3 flex gap-2 absolute bottom-0 w-full bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
          />
          <button
            onClick={handleMessage}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-full transition text-white shadow-lg"
          >
            <SendHorizontal size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
