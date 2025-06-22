// app/chat/_components/DMConversationList.tsx
"use client";
import DMConversationItem from "./DMConversationItem";
import { mockUsers } from "@/mocks/mockUsers";

const DMConversationList = () => {
  if (!mockUsers || mockUsers.length === 0) {
    return (
      <p className="w-full h-full flex items-center justify-center text-muted-foreground">
        No conversations found
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {mockUsers.map((user) => (
        <DMConversationItem
          key={user.id}
          id={user.id}
          username={user.username}
          imageUrl={user.imageUrl}
        />
      ))}
    </div>
  );
};

export default DMConversationList;