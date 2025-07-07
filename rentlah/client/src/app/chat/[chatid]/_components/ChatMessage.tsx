import React from 'react'

interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean;
}

const ChatMessage = ({ sender, message, isOwnMessage } : ChatMessageProps) => {
  return (
    <div className={`flex ${
        isOwnMessage ? "justify-end"
        : "justify-start"
    } mb-3`}
    >   
        <div className={`max-w-xs px-4 py-2 rounded-lg
            ${isOwnMessage ? "bg-blue-500 text-white"
            : "bg-white text black"
            }`}>
            <p className="text-sm font-bold">{sender}</p>
            <p>{message}</p>
        </div>
    </div>
  );
};

export default ChatMessage;
