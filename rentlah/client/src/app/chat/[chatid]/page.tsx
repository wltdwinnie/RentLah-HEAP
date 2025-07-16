"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./_components/Header";
import ChatForm from "./_components/ChatForm";
import ChatMessage from "./_components/ChatMessage";
import { socket } from "@/lib/socketClient";

const MESSAGES_LIMIT = 20;

const Page = ({ params }: { params: Promise<{ chatid: string }> }) => {
  const [chatid, setChatid] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [joined, setJoined] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const room = user && currentUser ? `dm:${[user.name, currentUser.name].sort().join("-")}` : "";

  // Resolve route param
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setChatid(resolved.chatid);
    };
    resolveParams();
  }, [params]);

  // Fetch current user
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

  // Fetch latest messages
  const fetchMessages = async (before?: string) => {
    if (!room || !currentUser || !user || loadingOlder) return;

    setLoadingOlder(true);

    const url = new URL(`/api/messages`, window.location.origin);
    url.searchParams.append("id", room);
    if (before) url.searchParams.append("before", before);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      setHasMore(false);
      setLoadingOlder(false);
      return;
    }

    const formatted = data.map((msg: any) => ({
      sender: msg.sender_id === currentUser.id ? currentUser.name : user.name,
      message: msg.message,
      created_at: msg.created_at,
    }));

    // Preserve scroll position when prepending
    const scroll = chatContainerRef.current;
    const prevHeight = scroll?.scrollHeight ?? 0;

    setMessages((prev) => [...formatted.reverse(), ...prev]);

    requestAnimationFrame(() => {
      if (scroll && before) {
        const newHeight = scroll.scrollHeight;
        scroll.scrollTop = newHeight - prevHeight;
      } else {
        // On first load scroll to bottom
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      }
    });

    setLoadingOlder(false);
  };

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
  }, [messages, hasMore, loadingOlder]);

  // Initial load of messages
  useEffect(() => {
    if (room && currentUser && user) fetchMessages();
  }, [room, currentUser, user]);

  // Socket listeners
  useEffect(() => {
    if (!room || !currentUser || !user || joined) return;

    socket.emit("join-room", { room, username: currentUser.name });
    setJoined(true);

    const onMessage = (data: any) => {
      if (data.sender !== currentUser.name) {
        setMessages((prev) => [...prev, data]);
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    };

    socket.on("message", onMessage);
    return () => socket.off("message", onMessage);
  }, [room, currentUser, user, joined]);

  const handleSendMessage = async (message: string) => {
    if (!currentUser || !user) return;

    const msgData = {
      room,
      sender: currentUser.name,
      message,
    };

    setMessages((prev) => [...prev, msgData]);
    socket.emit("message", msgData);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

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
        style={{ scrollBehavior: "smooth" }}
      >
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            sender={msg.sender}
            message={msg.message}
            isOwnMessage={msg.sender === currentUser.name}
            otherUserImage={user.image}
          />
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



