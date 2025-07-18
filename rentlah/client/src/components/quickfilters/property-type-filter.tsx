"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FILTER_OPTIONS, filterUtils } from "@/lib/filter-utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface PropertyTypeFilterProps {
  value?: string;
  onChange?: (propertyType: string) => void;
  className?: string;
}

const PROPERTY_TYPES = [
  { label: "All Property Types", value: "" },
  ...FILTER_OPTIONS.PROPERTY_TYPES.map((type) => ({
    label: type.label,
    value: type.id,
  })),
];

export function PropertyTypeFilter({
  value = "",
  onChange,
  className,
}: PropertyTypeFilterProps) {
  const [mounted, setMounted] = React.useState(false);
  const isMobile = useIsMobile();

  let responsiveStyling = cn("w-[156]");
    if (isMobile) {
      responsiveStyling = cn("w-[80px]");
    }

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (type: string) => {
    onChange?.(type);
  };

  const displayValue =
    value === ""
      ? (isMobile ? "All" : "All Property Types")
      : filterUtils.getDisplayLabel(value, FILTER_OPTIONS.PROPERTY_TYPES) ||
        (isMobile ? "All" : "All Property Types");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "hover:cursor-pointer justify-center inline-flex h-9 items-center rounded-full border border-[hsl(var(--primary))] bg-background px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          responsiveStyling,
          className
        )}
      >
        {mounted ? displayValue : (isMobile ? "All" : "All Property Types")}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl bg-white text-black dark:bg-black dark:text-white">
        {PROPERTY_TYPES.map((type) => (
          <DropdownMenuItem
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={cn(
              "hover:cursor-pointer",
              value === type.value ? "bg-accent" : ""
            )}
          >
            {type.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
