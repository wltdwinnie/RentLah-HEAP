"use client";

import { use, useEffect, useRef, useState, useCallback } from "react";
import Header from "@/app/chat/_components/Header";
import ChatForm from "@/app/chat/_components/ChatForm";
import ChatMessage from "@/app/chat/_components/ChatMessage";
import { socket, getSocket } from "@/lib/socketClient";
import { shouldShowTimestampHeader, getTimestampHeader, MessageType } from "@/utils/timeUtils";

const Page = ({ params }: { params: Promise<{ communityName: string; channelName: string }> }) => {
  const { communityName, channelName } = use(params);
  
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; image?: string } | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [joined, setJoined] = useState(false);
  const [firstRenderDone, setFirstRenderDone] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const room = `community:${communityName}-${channelName}`;

  // Helper function to scroll to bottom instantly
  const scrollToBottom = (smooth = false) => {
    if (smooth) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  };

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data = await res.json();
        setCurrentUser({ id: data.id, name: data.name || data.email?.split("@")[0] });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch messages
  const fetchMessages = useCallback(async (before?: string) => {
    if (!room || !currentUser || loadingOlder) return;

    setLoadingOlder(true);

    try {
      const url = new URL(`/api/messages`, window.location.origin);
      url.searchParams.append("id", room);
      if (before) url.searchParams.append("before", before);

      const res = await fetch(url.toString());
      
      if (!res.ok) {
        console.error("Failed to fetch messages:", res.status, res.statusText);
        setLoadingOlder(false);
        return;
      }

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
        setLoadingOlder(false);
        return;
      }

      // For community messages, we need to fetch user names for each unique sender_id
      const uniqueSenderIds = [...new Set(data.map((msg: { sender_id: string }) => msg.sender_id))];
      const senderNames: { [key: string]: string } = {};
      
      await Promise.all(
        uniqueSenderIds.map(async (senderId) => {
          try {
            const userRes = await fetch(`/api/users?id=${senderId}`);
            if (userRes.ok) {
              const userData = await userRes.json();
              senderNames[senderId] = userData.name || userData.email?.split("@")[0] || "Unknown User";
            } else {
              senderNames[senderId] = "Unknown User";
            }
          } catch (error) {
            console.error(`Error fetching user ${senderId}:`, error);
            senderNames[senderId] = "Unknown User";
          }
        })
      );

      const formatted: MessageType[] = data.map((msg: {
        sender_id: string;
        message: string;
        created_at: string;
      }) => ({
        sender: senderNames[msg.sender_id] || "Unknown User",
        message: msg.message,
        created_at: msg.created_at,
        sender_id: msg.sender_id,
      }));

      const scroll = chatContainerRef.current;
      const prevHeight = scroll?.scrollHeight ?? 0;

      setMessages((prev) => [...formatted, ...prev]);

      requestAnimationFrame(() => {
        if (scroll && before) {
          const newHeight = scroll.scrollHeight;
          scroll.scrollTop = newHeight - prevHeight;
        }
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingOlder(false);
    }
  }, [room, currentUser, loadingOlder, setHasMore, setLoadingOlder, setMessages, chatContainerRef]);

  // Scroll listener to load older messages
  useEffect(() => {
    const container = chatContainerRef.current;
    const onScroll = () => {
      if (container && container.scrollTop === 0 && hasMore && !loadingOlder) {
        const earliest = messages[0]?.created_at;
        if (earliest) fetchMessages(earliest);
      }
    };
    container?.addEventListener("scroll", onScroll);
    return () => container?.removeEventListener("scroll", onScroll);
  }, [messages, hasMore, loadingOlder, fetchMessages]);

  // Initial message load
  useEffect(() => {
    if (room && currentUser && !firstRenderDone) {
      fetchMessages().then(() => {
        requestAnimationFrame(() => {
          scrollToBottom(false); // No animation for initial load
          setFirstRenderDone(true);
        });
      });
    }
  }, [room, currentUser, firstRenderDone, fetchMessages]);

  // Join socket room and listen for messages
  useEffect(() => {
    if (!room || !currentUser || joined) return;

    try {
      // Make sure socket is connected first
      getSocket();
      
      socket.emit("join-room", { room, username: currentUser.name });
      setJoined(true);

      const onMessage = async (data: unknown) => {
        // Cast data to the expected type with type checking
        const messageData = data as {
          sender: string;
          sender_id?: string;
          user_id?: string;
          message: string;
          created_at?: string;
        };
        
        if (typeof messageData?.sender === 'string' && 
            typeof messageData?.message === 'string' && 
            messageData.sender !== currentUser.name && 
            messageData.sender_id !== currentUser.id) {
            
          let senderName = messageData.sender;
          
          // For community chats, we need to fetch the username from the user ID
          // because the socket server sends user ID in data.sender for community chats
          if (messageData.sender_id || messageData.user_id) {
            const senderId = messageData.sender_id || messageData.user_id;
            try {
              const userRes = await fetch(`/api/users?id=${senderId}`);
              if (userRes.ok) {
                const userData = await userRes.json();
                senderName = userData.name || userData.email?.split("@")[0] || "Unknown User";
              }
            } catch (error) {
              console.error(`Error fetching user ${senderId}:`, error);
              senderName = "Unknown User";
            }
          }
          
          const newMessage: MessageType = {
            sender: senderName,
            message: messageData.message,
            created_at: messageData.created_at || new Date().toISOString(),
            sender_id: messageData.sender_id || messageData.user_id,
          };
          
          setMessages((prev) => [...prev, newMessage]);
          requestAnimationFrame(() => scrollToBottom(true));
        }
      };

      socket.on("message", onMessage);
      
      // Ensure the cleanup function returns void
      return () => {
        socket.off("message", onMessage);
      };
    } catch (err) {
      console.warn("Chat socket connection unavailable:", err);
    }
  }, [room, currentUser, joined]);

  const handleSendMessage = async (message: string) => {
    if (!currentUser) return;

    const timestamp = new Date().toISOString();
    const msgData: MessageType = {
      sender: currentUser.name,
      message,
      created_at: timestamp,
      sender_id: currentUser.id, // Add sender_id for ownership tracking
    };

    setMessages((prev) => [...prev, msgData]);
    socket.emit("message", { ...msgData, room });

    requestAnimationFrame(() => scrollToBottom(true));

    // Save message to database
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room,
          message,
          sender_id: currentUser.id,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save message:", response.status, response.statusText);
        const errorText = await response.text();
        console.error("Error response:", errorText);
      } else {
        // DEBUG: Log successful response
        const responseData = await response.json();
        console.log("Message saved successfully:", responseData);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (!communityName || !channelName || !currentUser) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <Header 
        imageUrl={undefined} // No user image for community
        name={`#${channelName}`} // Show channel name with #
      />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-gray-200 p-4 mb-2 border rounded-lg dark:bg-zinc-900"
      >
        {messages.map((msg, i) => (
          <div key={i}>
            {/* Timestamp Header */}
            {shouldShowTimestampHeader(msg, messages[i - 1]) && (
              <div className="flex justify-center my-4">
                <div className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
                  {getTimestampHeader(msg.created_at)}
                </div>
              </div>
            )}
            
            {/* Chat Message */}
            <ChatMessage
              sender={msg.sender}
              message={msg.message}
              isOwnMessage={msg.sender_id === currentUser.id} // Use sender_id for ownership comparison
              otherUserImage={undefined} // No specific user image for community
              created_at={msg.created_at}
            />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-auto">
        <ChatForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Page;