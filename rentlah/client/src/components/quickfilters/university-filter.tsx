"use client";

import * as React from "react";
import { UNIVERSITIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { universityDisplayUtils } from "@/hooks/useUniversityFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GraduationCap } from "lucide-react";

interface UniversityDropdownProps {
  hasHat?: boolean;
  value?: string;
  onChange?: (university: string) => void;
  onSelect?: (university: string) => void;
  className?: string;
}

export function UniversityDropdown({
  hasHat,
  value = "Select University",
  onChange,
  onSelect,
  className,
}: UniversityDropdownProps) {
  const [mounted, setMounted] = React.useState(false);
  const [selectedUniversity, setSelectedUniversity] =
    React.useState<string>(value);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted) {
      setSelectedUniversity(value);
    }
  }, [value, mounted]);

  const handleSelect = (uni: string) => {
    const match = uni.match(/\(([^)]+)\)/);
    setSelectedUniversity(uni);
    onChange?.(uni);
    onSelect?.(match ? match[1] : uni); // for clean URL
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex h-9 items-center justify-center rounded-full border border-[hsl(var(--primary))] bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 w-auto gap-4",
          className
        )}
      >
        {hasHat ? <GraduationCap /> : null}
        {mounted
          ? universityDisplayUtils.getResponsiveDisplayText(selectedUniversity, isMobile)
          : universityDisplayUtils.getResponsiveDisplayText(value, isMobile)}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl bg-white text-black dark:bg-black dark:text-white">

        {UNIVERSITIES.map((uni) => (
          <DropdownMenuItem
            key={uni.postalCode}
            onClick={() => handleSelect(uni.name + " (" + uni.shortname + ")")}
          >
            {uni.name} ({uni.shortname})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
