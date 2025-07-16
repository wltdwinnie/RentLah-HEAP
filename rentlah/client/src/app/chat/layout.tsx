"use client";

import { useEffect, useState } from "react";
import CommunityBar from "@/components/features/chat/CommunityBar";
import ItemList from "@/components/features/chat/item-list/ItemList";
import DMConversationItem from "@/app/chat/_components/DMConversationItem";
import { ChevronDown } from "lucide-react";

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

  // Get current logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("/api/me");

        if (!res.ok) {
          const errMsg = await res.text();
          console.error("Failed to fetch current user:", res.status, errMsg);
          return;
        }

        const data = await res.json();
        setCurrentUserId(data.id);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchCurrentUser();
  }, []);

  // Get all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to load users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Filter users to exclude the current user
  const filteredUsers = users.filter((user) => user.id !== currentUserId);

  return (
    <div className="flex flex-col h-screen overflow-x-hidden">
      <div className="flex flex-1 min-h-0">
        {/* LEFT SIDEBAR */}
        <div className="w-64 min-w-64 max-w-64 flex flex-col border-r bg-white overflow-hidden">
          <div className="hover-scrollbar overflow-x-hidden overflow-y-auto flex-1">
            <CommunityBar />

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
              className="overflow-x-hidden"
            >
              {chatOpen &&
                Array.isArray(filteredUsers) &&
                filteredUsers.map((user) => (
                  <DMConversationItem
                    key={user.id}
                    id={user.id}
                    username={user.name}
                    imageUrl={user.image}
                  />
                ))}
            </ItemList>
          </div>
        </div>

        {/* RIGHT MAIN CHAT */}
        <main className="flex-1 min-w-0 overflow-auto custom-scrollbar p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ChatLayout;