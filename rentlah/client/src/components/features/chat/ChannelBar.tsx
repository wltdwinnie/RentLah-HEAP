"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Channel, ChannelBarProps } from "@/app/chat/types/chat";
import { useMemo } from "react";

const defaultChannels: Channel[] = [
  { name: "general" },
  { name: "announcements" }, // Fixed typo from "annoucements"
  { name: "looking-for-roommates" }, // Fixed typo from "looking-for-roomates"
];

const ChannelBar = ({ communityName, onBack, channels = defaultChannels }: ChannelBarProps) => {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const activeChannel = useMemo(() => {
    return channels.find(channel => pathname?.endsWith(`/${channel.name}`));
  }, [pathname, channels]);

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
        {channels.map((channel: Channel) => {
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