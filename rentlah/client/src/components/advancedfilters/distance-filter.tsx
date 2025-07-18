"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { DISTANCE_OPTIONS } from "@/lib/constants";

interface DistanceFilterProps {
  title: string;
  selectedValue: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function DistanceFilter({
  title,
  selectedValue,
  onChange,
  disabled = false,
}: DistanceFilterProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="p-2">
      <button
        type="button"
        className="flex items-center justify-between w-full py-1.5 text-gray-700 hover:bg-gray-50 rounded-sm transition-colors"
        onClick={() => setIsExpanded((v) => !v)}
        disabled={disabled}
      >
        <span className="text-sm font-medium dark:text-white dark:hover:bg-gray-100">{title}</span>
        {isExpanded ? (
          <ChevronDown className="text-gray-500" size={16} />
        ) : (
          <ChevronRight className="text-gray-500" size={16} />
        )}
      </button>
      {isExpanded && (
        <div className="mt-1 space-y-1 pl-2">
          {DISTANCE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`flex items-center space-x-2 py-1 px-1 cursor-pointer hover:bg-gray-500 dark:text-white rounded-sm text-sm text-gray-700 ${
                disabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <input
                type="radio"
                name="distance"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => onChange(option.value)}
                disabled={disabled}
                className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600"
              />
              <span>{option.label}</span>
            </label>
          ))}
          {disabled && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-3">
              <p className="text-xs text-yellow-700 text-center">
                💡 Select a university first to enable distance filtering
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
