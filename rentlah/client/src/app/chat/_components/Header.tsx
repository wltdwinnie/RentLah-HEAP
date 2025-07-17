import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeaderProps } from "@/app/chat/types/chat";

const Header = ({ imageUrl, name }: HeaderProps) => {
  return (
    <div className="w-full h-14 flex items-center justify-between px-4 border-b bg-white">
      <div className="flex items-center gap-3">
        <Link href="/chat" className="block lg:hidden">
          <CircleArrowLeft />
        </Link>

        <Avatar className="h-10 w-10">
          <AvatarImage src={imageUrl || ""} />
          <AvatarFallback>{name.substring(0, 1)}</AvatarFallback>
        </Avatar>

        <span className="font-semibold text-lg leading-none">{name}</span>
      </div>
    </div>
  );
};

export default Header;
