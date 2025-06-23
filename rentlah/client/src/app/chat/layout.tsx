"use client"

import { useState } from "react";
import CommunityBar from "@/components/features/chat/CommunityBar";
import ItemList from "@/components/features/chat/item-list/ItemList";
import DMConversationItem from "@/app/chat/_components/DMConversationItem";
import { ChevronDown } from "lucide-react";
import { users } from "@/mocks/mockUsers"

type Props = {
  children: React.ReactNode;
};



const ChatLayout = ({ children }: Props) => {
  const [chatOpen, setChatOpen] = useState(true);

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
                users.map((user) => (<DMConversationItem
                  key = {user.id}
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