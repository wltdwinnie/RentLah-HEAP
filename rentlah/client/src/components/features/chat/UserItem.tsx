import Link from "next/link";

export default function UserItem({ user }: { user: { id: string; name: string; lastMessage: string } }) {
  return (
    <Link href={`/chat/${user.id}`}>
      <div className="p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer">
        <div className="font-medium">{user.name}</div>
        <div className="text-sm text-gray-500 truncate">{user.lastMessage}</div>
      </div>
    </Link>
  );
}