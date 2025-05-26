"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

// Room type options
const roomTypes = [
  { id: "entire-unit", label: "Entire Unit" },
  { id: "private-room", label: "Private Room" },
  { id: "shared-room", label: "Shared Room" },
  { id: "studio", label: "Studio" },
];

export function AppSidebar() {
  const [isRoomTypeOpen, setIsRoomTypeOpen] = useState(true);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);

  const toggleRoomType = (typeId: string) => {
    setSelectedRoomTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const clearAll = () => {
    setSelectedRoomTypes([]);
  };

  return (
    <Sidebar className="border-r bg-white" collapsible="offcanvas">
      <div className="flex flex-col h-[calc(100vh-64px)] mt-[64px]">
        <SidebarHeader className="pl-5 py-3 border-b">
          <div className="flex items-center justify-between">
            <span className="font-medium">Filters</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 text-sm h-6"
              onClick={clearAll}
            >
              Clear All
            </Button>
          </div>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="p-2">
                <button
                  className="flex items-center justify-between w-full py-1.5 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
                  onClick={() => setIsRoomTypeOpen(!isRoomTypeOpen)}
                >
                  <span className="text-sm font-medium">Room Type</span>
                  {isRoomTypeOpen ? (
                    <ChevronDown className="text-gray-500" size={16} />
                  ) : (
                    <ChevronRight className="text-gray-500" size={16} />
                  )}
                </button>

                {isRoomTypeOpen && (
                  <div className="mt-1 space-y-1 pl-2">
                    {roomTypes.map((type) => (
                      <label
                        key={type.id}
                        className="flex items-center space-x-2 py-1 px-1 cursor-pointer hover:bg-gray-50 rounded-sm text-sm text-gray-700"
                      >
                        <input
                          type="checkbox"
                          className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600"
                          checked={selectedRoomTypes.includes(type.id)}
                          onChange={() => toggleRoomType(type.id)}
                        />
                        <span>{type.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
