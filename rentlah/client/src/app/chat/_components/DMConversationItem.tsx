"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Link from "next/link";
import { ChatUser } from "@/app/chat/types/chat";

type Props = ChatUser & {
  onClick?: () => void;
};

const DMConversationItem = ({ id, image, name, onClick }: Props) => {
  return (
    <Link href={`/chat/${id}`} className="w-full" onClick={onClick}>
     <Card className="p-2 flex flex-row items-center gap-4 truncate bg-white text-black dark:bg-black dark:text-white">

        <div className="flex flex-row items-center gap-4 truncate">
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col truncate">
            <h4 className="truncate">{name}</h4>
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
