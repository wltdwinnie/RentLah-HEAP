"use client";

import { Card } from "@/components/ui/card";
import useNavigation from "@/hooks/useNavigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

// TEMP MOCK DATA — will replace with useNavigation()
const mockPaths = [
  {
    label: "Messages",
    href: "/conversations",
    icon: () => <span>💬</span>, // placeholder icon
    active: true,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: () => <span>👤</span>, // placeholder icon
    active: false,
  },
];

const DesktopNav = () => {
  const paths = mockPaths; // eventually replace with useNavigation()

  return (
    <TooltipProvider>
      <Card className="hidden lg:flex lg:flex-col lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
        <nav>
          <ul className="flex flex-col items-center gap-4">
            {paths.map((path, id) => (
              <li key={id} className="relative">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={path.href}>
                      <Button
                        size="icon"
                        variant={path.active ? "default" : "outline"}
                        className="w-10 h-10"
                      >
                        <path.icon />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{path.label}</TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col items-center gap-4">
          <UserButton />
        </div>
      </Card>
    </TooltipProvider>
  );
};

export default DesktopNav;
