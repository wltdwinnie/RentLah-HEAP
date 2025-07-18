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

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelect = (type: string) => {
    onChange?.(type);
  };

  const displayValue =
    value === ""
      ? "All Property Types"
      : filterUtils.getDisplayLabel(value, FILTER_OPTIONS.PROPERTY_TYPES) ||
        "All Property Types";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center rounded-full border border-blue-600 bg-background px-2 py-1 font-medium ring-offset-background transition-colors hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap overflow-hidden",
          isMobile ? "h-8 text-xs min-w-[90px] max-w-[90px]" : "h-9 text-sm min-w-[120px] max-w-[180px]",
          className
        )}
      >
        <span className="truncate">
          {mounted ? (isMobile ? value || "Property" : displayValue) : "All Property Types"}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="rounded-xl bg-white text-black dark:bg-black dark:text-white max-h-[50vh] overflow-y-auto z-50"
        align="center"
      >

        {PROPERTY_TYPES.map((type) => (
          <DropdownMenuItem
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={value === type.value ? "bg-accent" : ""}
          >
            {type.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
