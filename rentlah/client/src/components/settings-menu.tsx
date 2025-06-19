"use client";

import { useState, useRef, useEffect } from "react";
import { Settings } from "lucide-react";
import { useTheme } from "next-themes";

const SettingsMenu = () => {
  
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<null | "language" | "account">(null);

  const { theme, setTheme } = useTheme();
  const toggleDarkMode = () => setTheme(theme === "dark" ? "light" : "dark");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(ev: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(ev.target as Node)) {
        setOpen(false);
        setActiveMenu(null);
      }
    }

    function handleScroll() {
      setOpen(false);
      setActiveMenu(null);
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // true = capture inside scrollable containers

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  const toggleMenu = (menu: "language" | "account") =>
    setActiveMenu((prev) => (prev === menu ? null : menu));

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      {/* gear icon */}
      <button onClick={() => setOpen(!open)} className="p-2 transition-colors">
        <Settings className="w-6 h-6 text-black dark:text-white" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded bg-white text-black dark:bg-zinc-800 dark:text-white shadow-lg p-2 z-50 text-sm">
          {/* account */}
          <div>
            <div
              onClick={() => toggleMenu("account")}
              className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700"
            >
              <span>{activeMenu === "account" ? "▴" : "▾"}</span>
              <span>My Account</span>
            </div>
            {activeMenu === "account" && (
              <div className="ml-6 mt-1">
                <p className="px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700">View Profile</p>
                <p className="px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700">Edit Info</p>
              </div>
            )}
          </div>

          {/* language */}
          <div>
            <div
              onClick={() => toggleMenu("language")}
              className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700"
            >
              <span>{activeMenu === "language" ? "▴" : "▾"}</span>
              <span>Language</span>
            </div>
            {activeMenu === "language" && (
              <div className="ml-6 mt-1">
                <p className="px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700">English</p>

                <p className="px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700">中文</p>
              </div>
            )}
          </div>

          {/* dark‑mode switch */}
          <div className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-blue-100 dark:hover:bg-zinc-700">
            <span>Dark Mode</span>
            <div
              onClick={toggleDarkMode}
              className={`w-10 h-5 flex items-center p-1 rounded-full transition-colors duration-300 ${theme === "dark" ? "bg-black" : "bg-gray-300"}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`}
              />
            </div>
          </div>

          {/* log out */}
          <p className="px-2 py-1 cursor-pointer text-red-500 hover:bg-blue-100 dark:hover:bg-zinc-700">Log Out</p>
        </div>
      )}
    </div>
  );
};

export { SettingsMenu };
