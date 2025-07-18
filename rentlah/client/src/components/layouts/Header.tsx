"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
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
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">

      {mounted &&
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              src={resolvedTheme === "dark" ? "/assets/darklogo.png" : "/assets/logo.png"}
              alt="RentLah Logo"
              width={200}
              height={50}
              className={styles.logo}
            />
          </Link>
        </div>
      }
      <div className="flex items-center gap-4">
        <button className={styles.bell} onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
          <Bell className="h-6 w-6" />
        </button>

        <Link href="/chat" className={styles.chat}>
          <MessageSquare className="h-6 w-6" />
        </Link>

        {!authLoading && (user ? (
          <div className={styles.profileSection} ref={dropdownRef}>
            <div className={styles.profileDropdown} onClick={() => setShowDropdown(!showDropdown)}>
              <Image
                src={user.image ? user.image : "/assets/profile_pic.webp"}
                alt="Profile"
                width={32}
                height={32}
                className={styles.profileIcon}
              />
              {showDropdown && (
                <div className={styles.profileMenu}>
                  <div className={styles.profileEmail}>{user.email}</div>
                  <hr className={styles.profileDivider} />
                  <button className={styles.profileButton} onClick={() => { router.push("/settings"); setShowDropdown(false); }}>Settings</button>
                  <button className={styles.logoutButton} onClick={() => { handleLogout(); setShowDropdown(false); }}>Logout</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <button className={styles.login} onClick={() => openModal("login")}>Login</button>
            <button className={`${styles.signup}`} onClick={() => openModal("signup")}>Sign Up</button>
          </>
        ))}
      </div>

      <Notification isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
      {showModal && <AuthModal type={authType} onClose={handleModalClose} />}
    </header>
  );
}
