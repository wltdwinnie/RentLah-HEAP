"use client";

import { useEffect, useState } from "react";
import CommunityBar from "@/components/features/chat/CommunityBar";
import ChannelBar from "@/components/features/chat/ChannelBar";
import ItemList from "@/components/features/chat/item-list/ItemList";
import DMConversationItem from "@/app/chat/_components/DMConversationItem";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

type User = {
  id: string;
  name: string;
  image: string;
};

const ChatLayout = ({ children }: Props) => {
  const [chatOpen, setChatOpen] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await fetch("/api/me");
      if (!res.ok) return;
      const data = await res.json();
      setCurrentUserId(data.id);
    };
    fetchCurrentUser();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => user.id !== currentUserId);

  // Sidebar variants for animation
  const variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

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
                  title={<span style={{ color: "#192e9a" }}>Chat</span>}
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
                        username={user.name}
                        imageUrl={user.image}
                      />
                    ))}
                </ItemList>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 overflow-auto hover-scrollbar p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;