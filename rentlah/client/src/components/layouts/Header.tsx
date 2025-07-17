"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
// import { SettingsMenu } from "@/components/settings-menu";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";
import { Bell, MessageSquare } from "lucide-react";
import Notification from "../features/Notification";
import { authClient } from "@/lib/authClient";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<{ id: string; name?: string; email?: string; image?: string | null } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const router = useRouter();
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log("Checking auth status...");
      }
      const session = await authClient.getSession();
      if (process.env.NODE_ENV === 'development') {
        console.log("Session response:", session); // Debugging
      }
      if (session && session.data && "user" in session.data) {
        if (process.env.NODE_ENV === 'development') {
          console.log("Authenticated user:", session.data.user);
        }
        setUser(session.data.user);
      } else {
        //Temporaty. Will add GUI later
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

  const openModal = (type: "login" | "signup") => {
    setAuthType(type);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Refresh auth status after login/signup
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
    <header
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow-md">
    

      {/* Temporary logo */}
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="RentLah Logo"
            width={200}
            height={50}
          />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
      <button
        className={styles.bell}
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
      >
        <Bell className="h-6 w-6" />
      </button>

      <Link href="/chat" className={styles.chat}>
        <MessageSquare className="h-6 w-6" />
      </Link>


        {/* Auth buttons or user profile */}
        {!authLoading &&
          (user ? (
            // Show Google logo as profile icon when authenticated
            <div className={styles.profileSection}>
              <div className={styles.profileDropdown}>
                <Image
                  src={user.image ? user.image : "/assets/profile_pic.webp"}
                  alt="Profile"
                  width={32}
                  height={32}
                  className={styles.profileIcon}
                />
                <div className={styles.profileMenu}>
                  <div className={styles.profileEmail}>{user.email}</div>
                  <hr className={styles.profileDivider} />
                  <button className={styles.profileButton}>My Profile</button>
                  <button
                    className={styles.profileButton}
                    onClick={() => router.push("/settings")}
                  >
                    Settings
                  </button>
                  <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Show login/signup when not authenticated
            <>
              <button
                className={styles.login}
                onClick={() => openModal("login")}
              >
                Login
              </button>
              <button
                className={styles.signup}
                onClick={() => openModal("signup")}
              >
                Sign Up
              </button>
            </>
          ))}
      </div>
      <Notification
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* Auth modal */}
      {showModal && <AuthModal type={authType} onClose={handleModalClose} />}
    </header>
  );
}
