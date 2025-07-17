// app/chat/_components/DMConversationItem.tsx
"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";
import { ChatUser } from "@/app/chat/types/chat";

type Props = ChatUser;

const DMConversationItem = ({ id, imageUrl, username }: Props) => {
  return (
    <Link href={`/chat/${id}`} className="w-full">
      <Card className="p-2 flex flex-row items-center gap-4 truncate">
        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={imageUrl} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{username}</h4>
            <p className="text-sm text-muted-foreground truncate">
              Start the conversation!
            </p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default DMConversationItem;
