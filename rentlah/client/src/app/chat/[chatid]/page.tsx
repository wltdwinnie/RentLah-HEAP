"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/app/chat/_components/Header";
import ChatForm from "@/app/chat/_components/ChatForm";
import ChatMessage from "@/app/chat/_components/ChatMessage";
import { socket } from "@/lib/socketClient";
import { shouldShowTimestampHeader, getTimestampHeader } from "@/utils/timeUtils";
import { ChatUser, MessageType, ApiMessageResponse, ApiUserResponse } from "@/app/chat/types/chat";


const Page = ({ params }: { params: Promise<{ chatid: string }> }) => {
  const [chatid, setChatid] = useState<string>("");
  const [user, setUser] = useState<ChatUser | null>(null);
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [joined, setJoined] = useState(false);
  const [firstRenderDone, setFirstRenderDone] = useState(false);

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
      setCurrentUser({ id: data.id, name: data.name || data.email?.split("@")[0] });
    };
    fetchCurrentUser();
  }, []);

  // Fetch other user
  useEffect(() => {
    if (!chatid) return;
    const fetchUser = async () => {
      const res = await fetch(`/api/users?id=${chatid}`);
      if (!res.ok) return;
      const data = await res.json();
      setUser({ ...data, name: data.name || data.email?.split("@")[0] });
    };
    fetchUser();
  }, [chatid]);

  const fetchMessages = async (before?: string) => {
    if (!room || !currentUser || !user || loadingOlder) return;

    setLoadingOlder(true);

    const url = new URL(`/api/messages`, window.location.origin);
    url.searchParams.append("id", room);
    if (before) url.searchParams.append("before", before);

    const res = await fetch(url.toString());
    const data: ApiMessageResponse[] = await res.json(); // Type the response

    if (!Array.isArray(data) || data.length === 0) {
      setHasMore(false);
      setLoadingOlder(false);
      return;
    }

    const formatted: MessageType[] = data.map((msg: ApiMessageResponse) => ({
      sender: msg.sender_id === currentUser.id ? currentUser.name! : user.name!, // Use non-null assertion since we know they exist
      message: msg.message,
      created_at: msg.created_at,
    }));

    const scroll = chatContainerRef.current;
    const prevHeight = scroll?.scrollHeight ?? 0;

    setMessages((prev) => [...formatted.reverse(), ...prev]);

    requestAnimationFrame(() => {
      if (scroll && before) {
        const newHeight = scroll.scrollHeight;
        scroll.scrollTop = newHeight - prevHeight;
      }
    });

    setLoadingOlder(false);
  };

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
  }, [messages, hasMore, loadingOlder]);

  useEffect(() => {
    if (room && currentUser && user && !firstRenderDone) {
      fetchMessages().then(() => {
        requestAnimationFrame(() => {
          scrollToBottom(false); 
          setFirstRenderDone(true);
        });
      });
    }
  }, [room, currentUser, user, firstRenderDone]);


  useEffect(() => {
    if (!room || !currentUser || !user || joined) return;

    socket.emit("join-room", { room, username: currentUser.name });
    setJoined(true);

    const onMessage = (data: any) => {
      if (data.sender !== currentUser.name) {
        const newMessage: MessageType = {
          sender: data.sender,
          message: data.message,
          created_at: data.created_at || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMessage]);

        requestAnimationFrame(() => scrollToBottom(true));
      }
    };

    socket.on("message", onMessage);
    return () => socket.off("message", onMessage);
  }, [room, currentUser, user, joined]);

  const handleSendMessage = async (message: string) => {
    if (!currentUser || !user) return;

    const timestamp = new Date().toISOString();
    const msgData: MessageType = {
      sender: currentUser.name,
      message,
      created_at: timestamp,
    };

    setMessages((prev) => [...prev, msgData]);
    socket.emit("message", { ...msgData, room });
    requestAnimationFrame(() => scrollToBottom(true));

    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender_id: currentUser.id,
        receiver_id: user.id,
        room,
        message,
      }),
    });
  };

  if (!user || !chatid || !currentUser) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <Header imageUrl={user.image} name={user.name} />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-gray-200 p-4 mb-2 border rounded-lg"
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


