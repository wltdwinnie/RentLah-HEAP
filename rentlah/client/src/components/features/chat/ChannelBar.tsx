"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { ArrowLeft } from "lucide-react";

const channels = [
  { name: "general" },
  { name: "annoucements" },
  { name: "looking-for-roomates" },
];

type Props = {
  communityName: string;
  onBack: () => void;
};

const ChannelBar = ({ communityName, onBack }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2 p-4 border-r bg-white h-full">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Communities
      </button>

      {/* Community title */}
      <div className="text-lg font-semibold text-gray-800 mb-2">
        {communityName.toUpperCase()}
      </div>

      {/* Channels */}
      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Channels
      </div>

      <ul className="space-y-1">
        {channels.map((channel) => {
          const active = pathname?.endsWith(`/${channel.name}`);
          return (
            <li key={channel.name}>
              <Link
                href={`/chat/community/${communityName}/${channel.name}`}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                #{channel.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelBar;