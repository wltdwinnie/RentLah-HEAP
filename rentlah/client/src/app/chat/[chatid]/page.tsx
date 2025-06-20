"use client";

import { useEffect, useState } from 'react';
import { users } from "@/mocks/mockUsers";
import ChatForm from "./_components/ChatForm";
import ChatMessage from "./_components/ChatMessage";
import { socket } from "@/lib/socketClient";

const Page = ({ params }: { params: { chatid: string } }) => {
  const user = users.find((u) => u.id === params.chatid);
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);
  const [userName] = useState("Me"); // Hardcoded or get from auth
  const [joined, setJoined] = useState(false);

  // Create a consistent room ID based on user IDs
  const room = `dm:${["Me", user?.name].sort().join("-")}`;

  useEffect(() => {
    if (!user) return;

    // Join the room when page loads
    socket.emit("join-room", { room, username: userName });
    setJoined(true);

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socket.on("user_joined", (data) => {
      setMessages((prev) => [
        ...prev,
        { sender: "system", message: `${data.username} joined` },
      ]);
    });

    return () => {
      socket.off("message");
      socket.off("user_joined");
    };
  }, [user, room, userName]);

  const handleSendMessage = (message: string) => {
    const data = { room, message, sender: userName };
    setMessages((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>Chatting with {user.name}</h1>
      <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            isOwnMessage={msg.sender === userName}
          />
        ))}
      </div>
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Page;





