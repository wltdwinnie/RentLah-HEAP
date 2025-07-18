"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Header from "@/app/chat/_components/Header";
import ChatForm from "@/app/chat/_components/ChatForm";
import ChatMessage from "@/app/chat/_components/ChatMessage";
import { socket } from "@/lib/socketClient";
import { shouldShowTimestampHeader, getTimestampHeader } from "@/utils/timeUtils";
import { ChatUser, MessageType, ApiMessageResponse } from "@/app/chat/types/chat";

const Page = ({ params }: { params: Promise<{ chatid: string }> }) => {
  const [chatid, setChatid] = useState<string>("");
  const [user, setUser] = useState<ChatUser | null>(null);
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const [joined, setJoined] = useState(false); 

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const room = user && currentUser ? `dm:${[user.name, currentUser.name].sort().join("-")}` : "";

  const scrollToBottom = (smooth = false) => {
    if (smooth) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  };

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setChatid(resolved.chatid);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) return;
      const data = await res.json();
      setCurrentUser({ id: data.id, name: data.name || data.email?.split("@")[0], image: data.image });
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!chatid) return;
    const fetchUser = async () => {
      const res = await fetch(`/api/users?id=${chatid}`);
      if (!res.ok) return;
      const data = await res.json();
      setUser({ id: data.id, name: data.name || data.email?.split("@")[0], image: data.image });
    };
    fetchUser();
  }, [chatid]);

  const fetchMessages = useCallback(async (before?: string) => {
    if (!room || !currentUser || !user || loadingOlder) return;

    setLoadingOlder(true);

    const url = new URL(`/api/messages`, window.location.origin);
    url.searchParams.append("id", room);
    if (before) url.searchParams.append("before", before);

    const res = await fetch(url.toString());
    const data: ApiMessageResponse[] = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      setHasMore(false);
      setLoadingOlder(false);
      return;
    }

    const formatted: MessageType[] = data.map((msg: ApiMessageResponse) => ({
      sender: msg.sender_id === currentUser.id ? currentUser.name! : user.name!,
      message: msg.message,
      created_at: msg.created_at,
    }));

    const scroll = chatContainerRef.current;
    const prevHeight = scroll?.scrollHeight ?? 0;

    if (before) {
      setMessages((prev) => [...formatted, ...prev]);
    } else {
      setMessages(formatted);
    }

    requestAnimationFrame(() => {
      if (scroll && before) {
        const newHeight = scroll.scrollHeight;
        scroll.scrollTop = newHeight - prevHeight;
      }
    });

    setLoadingOlder(false);
  }, [room, currentUser, user, loadingOlder]);

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

  useEffect(() => {
    if (room && currentUser && user && !firstRenderDone) {
      fetchMessages().then(() => {
        requestAnimationFrame(() => {
          scrollToBottom(false);
          setFirstRenderDone(true);
        });
      });
    }
  }, [room, currentUser, user, firstRenderDone, fetchMessages]);

  // Simplified socket connection logic - matching community chat
  useEffect(() => {
    if (!room || !currentUser || joined) return;

    try {
      socket.emit("join-room", { room, username: currentUser.name });
      setJoined(true);

      const onMessage = (data: unknown) => {
        const messageData = data as { sender: string; message: string; created_at?: string };

        if (typeof messageData?.sender === 'string' && 
            typeof messageData?.message === 'string') {
          
          // Only add message if it's not from current user (to avoid duplicates)
          if (messageData.sender !== currentUser.name) {
            const newMessage: MessageType = {
              sender: messageData.sender,
              message: messageData.message,
              created_at: messageData.created_at || new Date().toISOString(),
            };
            
            setMessages((prev) => [...prev, newMessage]);
            requestAnimationFrame(() => scrollToBottom(true));
          }
        }
      };

      socket.on("message", onMessage);

      return () => {
        socket.off("message", onMessage);
      };
    } catch (err) {
      console.warn("Chat socket connection unavailable:", err);
    }
  }, [room, currentUser, joined]);

  const handleSendMessage = async (message: string) => {
    if (!currentUser || !user) return;

    const timestamp = new Date().toISOString();
    const msgData = {
      sender: currentUser.name || currentUser.id,
      message,
      created_at: timestamp,
      room
    };
    

    setMessages((prev) => [...prev, msgData]);
    

    socket.emit("message", { ...msgData });
    
    requestAnimationFrame(() => scrollToBottom(true));

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_id: currentUser.id,
          receiver_id: user.id,
          room,
          message,
        }),
      });
      
      if (!response.ok) {
        console.error("Failed to save message to database");
      }
    } catch (err) {
      console.error("Error saving message:", err);
    }
  };

  if (!user || !chatid || !currentUser) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <Header imageUrl={user.image} name={user.name ?? user.id} />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 mb-2 border rounded-lg bg-white text-black dark:bg-black dark:text-white"
      >
        {loadingOlder && (
          <div className="flex justify-center py-2">
            <div className="text-gray-500 text-sm">Loading older messages...</div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i}>
            {/* Timestamp Header */}
            {shouldShowTimestampHeader(msg, messages[i - 1]) && (
              <div className="flex justify-center my-4">
                <div className="bg-gray-300 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {getTimestampHeader(msg.created_at)}
                </div>
              </div>
            )}

            {/* Chat Message */}
            <ChatMessage
              sender={msg.sender}
              message={msg.message}
              isOwnMessage={msg.sender === currentUser.name}
              otherUserImage={user.image}
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