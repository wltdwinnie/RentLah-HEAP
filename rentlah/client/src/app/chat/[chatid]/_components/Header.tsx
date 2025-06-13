import React from 'react'
import { CircleArrowLeft } from "lucide-react"
import Link from "next/link";
import {Card} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
    imageUrl?: string;
    name: string;
}

const Header = ({imageUrl, name}) => {
  return (
    <Card className= 'w-full flex rounded-lg items-center p-2 justify-between'>
        <div className = "flex items-center gap-2">
            <Link href = "/chat" className = "block lg:hidden"><CircleArrowLeft /></Link>
            <Avatar className = "h-8 w-8">
              <AvatarImage src = {imageUrl} />
              <AvatarFallback>
                {name.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
        </div>
    </Card>
  )
}

export default Header
