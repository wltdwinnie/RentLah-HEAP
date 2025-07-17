"use client";

import { useEffect, useState } from "react";
import CommunityBar from "@/components/features/chat/CommunityBar";
import ChannelBar from "@/components/features/chat/ChannelBar";
import ItemList from "@/components/features/chat/item-list/ItemList";
import DMConversationItem from "@/app/chat/_components/DMConversationItem";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ChatUser, ChatLayoutProps } from "@/app/chat/types/chat";

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const [chatOpen, setChatOpen] = useState(true);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/me");
        if (!res.ok) {

          alert("You need to log in to access the chat feature.");
          window.location.href = "/";
          return;
        }
        const data = await res.json();
        setCurrentUserId(data.id);
      } catch (error) {
        console.error("Error fetching current user:", error);
        alert("You need to log in to access the chat feature.");
        window.location.href = "/";
      } finally {
        setIsLoading(false);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.id !== currentUserId);

  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading chat...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <div className="flex flex-1 min-h-0">
        {/* LEFT SIDEBAR */}
        <div className="w-64 min-w-64 max-w-64 relative overflow-hidden border-r bg-white">
          <AnimatePresence mode="wait">
            {selectedCommunity ? (
              <motion.div
                key="channel-bar"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 overflow-y-auto custom-scrollbar"
              >
                <ChannelBar
                  communityName={selectedCommunity}
                  onBack={() => setSelectedCommunity(null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="community-bar"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="absolute inset-0 overflow-y-auto hover-scrollbar"
              >
                <CommunityBar onSelectCommunity={(name) => setSelectedCommunity(name)} />

                <ItemList
                  title="Chat"
                  titleClassName="text-blue-800"
                  action={
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform cursor-pointer ${
                        chatOpen ? "rotate-180" : ""
                      }`}
                      onClick={() => setChatOpen(!chatOpen)}
                    />
                  }
                >
                  {chatOpen &&
                    filteredUsers.map((user) => (
                      <DMConversationItem
                        key={user.id}
                        id={user.id}
                        name={user.name || "User"}
                        image={user.image}
                        email={user.email}
                      />
                    ))}
                </ItemList>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-auto hover-scrollbar p-4">{children}</main>
      </div>
    </div>
  );
};

export default ChatLayout;