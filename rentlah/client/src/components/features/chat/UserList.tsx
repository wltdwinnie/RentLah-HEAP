
"use client";

import UserItem from "./UserItem";

const mockUsers = [
  { id: "1", name: "Alice", lastMessage: "Hello" },
  { id: "2", name: "Bob", lastMessage: "Hello" },
  { id: "3", name: "Charlie", lastMessage: "Hello" },
  { id: "4", name: "Nathan", lastMessage: "Hello" },
  { id: "5", name: "Josh", lastMessage: "Hello" },
  { id: "6", name: "Chris", lastMessage: "Hello" },
  { id: "7", name: "Alex", lastMessage: "Hello" },
];

export default function UserList() {
  return (
    <div className="p-4 space-y-10 text-left">
      {mockUsers.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}