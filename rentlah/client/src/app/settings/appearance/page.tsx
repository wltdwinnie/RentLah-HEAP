"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AppearancePage() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-black dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 0111.21 3 7 7 0 0012 21a9 9 0 009-8.21z"
          />
        </svg>
        Dark mode
      </h1>

      <div className="space-y-4 text-sm text-gray-900 dark:text-white">
        <label className="flex items-center justify-between border-b pb-2 cursor-pointer">
          <span>On</span>
          <input
            type="radio"
            name="theme"
            checked={theme === "dark"}
            onChange={() => setTheme("dark")}
            className="form-radio accent-blue-500"
          />
        </label>

        <label className="flex items-center justify-between border-b pb-2 cursor-pointer">
          <span>Off</span>
          <input
            type="radio"
            name="theme"
            checked={theme === "light"}
            onChange={() => setTheme("light")}
            className="form-radio accent-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1 justify-between cursor-pointer">
          <div className="flex items-center justify-between">
            <span>System</span>
            <input
              type="radio"
              name="theme"
              checked={theme === "system"}
              onChange={() => setTheme("system")}
              className="form-radio accent-blue-500"
            />
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            We'll adjust your appearance based on your system settings.
          </span>
        </label>
      </div>
    </div>
  );
}
