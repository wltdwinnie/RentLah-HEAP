"use client";

import { useTheme } from "next-themes";

export default function AppearancePage() {
  const { setTheme } = useTheme();

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">Appearance</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setTheme("light")}
          className="px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border"
        >
          Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="px-4 py-2 rounded bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border"
        >
          Dark
        </button>
      </div>
    </div>
  );
}
