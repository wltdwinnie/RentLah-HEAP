"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";
import { Bell, MessageSquare } from "lucide-react";
import Notification from "../features/Notification";
import { authClient } from "@/lib/authClient";
import { useTheme } from "next-themes";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ id: string; name?: string; email?: string; image?: string | null } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("Checking auth status...");
      }
      const session = await authClient.getSession();
      if (process.env.NODE_ENV === 'development') {
        console.log("Session response:", session);
      }
      if (session && session.data && "user" in session.data) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Authenticated user:", session.data.user);
        }
        setUser(session.data.user);
      } else {
        if (!isHomePage) {
          alert("Please log in to access this page. Redirecting...");
          router.push("/");
        }
        setUser(null);
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, [isHomePage, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openModal = (type: "login" | "signup") => {
    setAuthType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setTimeout(async () => {
      try {
        const session = await authClient.getSession();
        if (session && typeof session === 'object' && "user" in session) {
          const sessionUser = session.user as { id: string; name?: string; email?: string; image?: string | null };
          setUser(sessionUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Auth refresh failed:", error);
        }
      }
    }, 100);
  };

  const handleLogout = async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        console.log("Logging out...");
      }
      await authClient.signOut();
      setUser(null);
      router.refresh();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-2 sm:p-4 bg-white dark:bg-gray-900 shadow-md">

      {mounted &&
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <Image
              src={resolvedTheme === "dark" ? "/assets/darklogo.png" : "/assets/logo.png"}
              alt="RentLah Logo"
              width={150}
              height={40}
              className="max-w-[100px] sm:max-w-[150px]"
            />
          </Link>
        </div>
      }
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
          <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <Link href="/chat" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
        </Link>

        {!authLoading && (user ? (
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
              <Image
                src={user.image ? user.image : "/assets/profile_pic.webp"}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full w-7 h-7 sm:w-8 sm:h-8"
              />
              {showDropdown && (
                <div className="absolute right-0 top-10 mt-1 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700 truncate text-sm">{user.email}</div>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => { router.push("/saved-properties"); setShowDropdown(false); }}>Saved Properties</button>
                  <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => { router.push("/settings"); setShowDropdown(false); }}>Settings</button>
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm" onClick={() => { handleLogout(); setShowDropdown(false); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button 
              className="text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 border border-gray-300 rounded-full hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800" 
              onClick={() => openModal("login")}
            >
              Login
            </button>
            <button 
              className="text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-3 bg-blue-600 text-white rounded-full hover:bg-blue-700" 
              onClick={() => openModal("signup")}
            >
              Sign Up
            </button>
          </div>
        ))}
      </div>

      <Notification isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      {showModal && <AuthModal type={authType} onClose={handleModalClose} />}
    </header>
  );
}
