import React from 'react'

interface ChatMessageProps {
    sender: string;
    message: string;
    isOwnMessage: boolean;
    otherUserImage?: string;
}

const ChatMessage = ({ sender, message, isOwnMessage, otherUserImage }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-2 mb-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && otherUserImage && (
        <img
          src={otherUserImage}
          alt={sender}
          className="h-8 w-8 rounded-full object-cover"
        />
      )}

      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isOwnMessage ? "bg-blue-500 text-white" : "bg-white text-black border"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-sm font-bold mb-1">{sender}</p>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
