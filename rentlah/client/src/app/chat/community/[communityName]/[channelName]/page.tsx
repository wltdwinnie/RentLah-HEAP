"use client";

import { use, useEffect, useRef, useState, useCallback } from "react";
import Header from "@/app/chat/_components/Header";
import ChatForm from "@/app/chat/_components/ChatForm";
import ChatMessage from "@/app/chat/_components/ChatMessage";
import { socket } from "@/lib/socketClient";
import { shouldShowTimestampHeader, getTimestampHeader } from "@/utils/timeUtils";
import { 
  MessageType, 
  ChatUser, 
  ApiMessageResponse, 
  ApiUserResponse, 
  SocketMessageData, 
  SenderNameMap,
  CommunityPageProps 
} from "@/app/chat/types/chat";

const Page = ({ params }: CommunityPageProps) => {
  const { communityName, channelName } = use(params);
  
  const [currentUser, setCurrentUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingOlder, setLoadingOlder] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [firstRenderDone, setFirstRenderDone] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const room = `community:${communityName}-${channelName}`;

  const scrollToBottom = (smooth = false): void => {
    if (smooth) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async (): Promise<void> => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) return;
        const data: ApiUserResponse = await res.json();
        setCurrentUser({ 
          id: data.id, 
          name: data.name || data.email?.split("@")[0] || "Unknown User",
          email: data.email,
          image: data.image,
          username: data.username,
          imageUrl: data.imageUrl
        });
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  const fetchMessages = useCallback(async (before?: string): Promise<void> => {
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

      const data: ApiMessageResponse[] = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        setHasMore(false);
        setLoadingOlder(false);
        return;
      }

      const uniqueSenderIds = [...new Set(data.map((msg: ApiMessageResponse) => msg.sender_id))];
      const senderNames: SenderNameMap = {};
      
      await Promise.all(
        uniqueSenderIds.map(async (senderId: string): Promise<void> => {
          try {
            const userRes = await fetch(`/api/users?id=${senderId}`);
            if (userRes.ok) {
              const userData: ApiUserResponse = await userRes.json();
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

      const formatted: MessageType[] = data.map((msg: ApiMessageResponse) => ({
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
  }, [room, currentUser, loadingOlder]);

  useEffect(() => {
    const container = chatContainerRef.current;
    const onScroll = (): void => {
      if (container && container.scrollTop === 0 && hasMore && !loadingOlder) {
        const earliest = messages[0]?.created_at;
        if (earliest) fetchMessages(earliest);
      }
    };
    container?.addEventListener("scroll", onScroll);
    return () => container?.removeEventListener("scroll", onScroll);
  }, [messages, hasMore, loadingOlder, fetchMessages]);

  useEffect(() => {
    if (room && currentUser && !firstRenderDone) {
      fetchMessages().then(() => {
        requestAnimationFrame(() => {
          scrollToBottom(false); 
          setFirstRenderDone(true);
        });
      });
    }
  }, [room, currentUser, firstRenderDone, fetchMessages]);

  useEffect(() => {
    if (!room || !currentUser || joined) return;

    try {
      socket.emit("join-room", { room, username: currentUser.name });
      setJoined(true);

      const onMessage = async (data: SocketMessageData): Promise<void> => {
        if (data.sender !== currentUser.name && data.sender_id !== currentUser.id) {
          let senderName = data.sender;

          if (data.sender_id || data.user_id) {
            const senderId = data.sender_id || data.user_id;
            try {
              const userRes = await fetch(`/api/users?id=${senderId}`);
              if (userRes.ok) {
                const userData: ApiUserResponse = await userRes.json();
                senderName = userData.name || userData.email?.split("@")[0] || "Unknown User";
              }
            } catch (error) {
              console.error(`Error fetching user ${senderId}:`, error);
              senderName = "Unknown User";
            }
          }
          
          const newMessage: MessageType = {
            sender: senderName,
            message: data.message,
            created_at: data.created_at || new Date().toISOString(),
            sender_id: data.sender_id || data.user_id,
          };
          
          setMessages((prev) => [...prev, newMessage]);
          requestAnimationFrame(() => scrollToBottom(true));
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

  const handleSendMessage = async (message: string): Promise<void> => {
    if (!currentUser) return;

    const timestamp = new Date().toISOString();
    const msgData: MessageType = {
      sender: currentUser.name!,
      message,
      created_at: timestamp,
      sender_id: currentUser.id,
    };

    setMessages((prev) => [...prev, msgData]);
    socket.emit("message", { ...msgData, room });

    requestAnimationFrame(() => scrollToBottom(true));

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
        imageUrl={undefined}
        name={`#${channelName}`}
      />
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-gray-200 p-4 mb-2 border rounded-lg"
      >
        {messages.map((msg, i) => (
          <div key={i}>
            {shouldShowTimestampHeader(msg, messages[i - 1]) && (
              <div className="flex justify-center my-4">
                <div className="bg-gray-300 text-gray-700 text-xs px-3 py-1 rounded-full">
                  {getTimestampHeader(msg.created_at)}
                </div>
              </div>
            )}
            
            <ChatMessage
              sender={msg.sender}
              message={msg.message}
              isOwnMessage={msg.sender_id === currentUser.id} 
              otherUserImage={undefined} 
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