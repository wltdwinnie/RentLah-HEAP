import React, { useState } from 'react';
import Image from 'next/image';
import { formatTimestamp } from '@/utils/timeUtils';
import { ChatMessageProps } from "@/app/chat/types/chat";
const ChatMessage = ({
  sender,
  message,
  isOwnMessage,
  otherUserImage,
  created_at,
}: ChatMessageProps) => {
  const [showTimestamp, setShowTimestamp] = useState<boolean>(false);

  const handleMessageClick = (): void => {
    setShowTimestamp(!showTimestamp);
  };

  return (
    <div
      className={`flex items-start gap-2 mb-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && otherUserImage && (
        <Image
          src={otherUserImage}
          alt={sender}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      )}

      <div className="flex flex-col">
        <div
          className={`max-w-xs px-4 py-2 rounded-lg cursor-pointer ${
            isOwnMessage ? "bg-blue-500 text-white" : "bg-white text-black border"
          }`}
          onClick={handleMessageClick}
        >
          {!isOwnMessage && <p className="text-sm font-bold mb-1">{sender}</p>}
          <p>{message}</p>
        </div>

        {showTimestamp && (
          <div
            className={`text-xs text-gray-500 mt-1 ${
              isOwnMessage ? "text-right" : "text-left"
            }`}
          >
            {formatTimestamp(created_at)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
