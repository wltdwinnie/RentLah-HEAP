"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { SettingsMenu } from "@/components/settings-menu";
import { UniversityDropdown } from "../quickfilters/university-filter";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "@/components/auth/AuthModal";
import { Bell } from "lucide-react";
import Notification from "../features/Notification";
import { authClient } from "@/lib/authClient";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth status...");
      const session = await authClient.getSession();
      console.log("Session response:", session); // Debugging
      if (session && session.data && "user" in session.data) {
        console.log("Authenticated user:", session.data.user);
        setUser(session.data.user);
      } else {
        //Temporaty. Will add GUI later
        if(!isHomePage){
          alert("Please log in to access this page. Redirecting...");
          router.push("/");
        }
        setUser(null);
      }
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  // useEffect(() => {
  // const autoLoginAfterVerification = async () => {
  //   try {
  //     const email = localStorage.getItem("auth_email");
  //     const password = localStorage.getItem("auth_password");

  //     if (email && password) {
  //       const result = await authClient.signIn.email({ email, password });

  //       if (!result.error) {
  //         const session = await authClient.getSession();
  //         setUser(session?.data?.user ?? null);

  //         localStorage.removeItem("auth_email");
  //         localStorage.removeItem("auth_password");
          
  //       } else {
  //         console.log("Auto-login failed:", result.error);
  //       }
  //     }
  //   } catch (err: any) {
  //     console.log("Auto-login error:", err);
  //   } finally {
  //     // Clean URL
  //     router.replace("/");
  //   }
  // };
//   autoLoginAfterVerification();
// }, [router]);

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
        setUser(session && "user" in session ? session.user : null);
      } catch (error) {
        console.log("Auth refresh failed:", error);
      }
    }, 100);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await authClient.signOut();
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleUniversitySelect = (uni: string) => {
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Temporary logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/assets/logo.png"
            alt="RentLah Logo"
            width={200}
            height={50}
          />
        </div>

        {/* Search Bar with Dropdown - only show on home page */}
        {isHomePage && (
          <UniversityDropdown
            className="w-[400px] mx-6"
            onSelect={handleUniversitySelect}
          />
        )}

        {/* Action Buttons */}
        <div className={styles.actions}>
          {/* Settings icon dropdown */}
          <div style={{ marginLeft: "1rem" }}>
            <SettingsMenu />
          </div>
          <button
            className={styles.bell}
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-6 w-6" />
          </button>

          {/* Auth buttons or user profile */}
          {!authLoading &&
            (user ? (
              // Show Google logo as profile icon when authenticated
              <div className={styles.profileSection}>
                <div className={styles.profileDropdown}>
                  <Image
                    src="/assets/profile_pic.jpg"
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
    </>
  );
}
