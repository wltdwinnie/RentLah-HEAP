"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { SettingsMenu } from "@/components/settings-menu";
import { UniversityDropdown } from "@/components/features/university-select";
import { usePathname, useRouter } from "next/navigation";
import AuthModal from "../features/login/AuthModal";
import { Bell } from "lucide-react";
import Notification from "../features/Notification";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const openModal = (type: "login" | "signup") => {
    setAuthType(type);
    setShowModal(true);
  };

  const handleUniversitySelect = (uni: string) => {
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <Image
            src="/assets/logo.png"
            alt="RentLah Logo"
            width={200}
            height={50}
          />
        </div>

        {/* University dropdown (only show on home page) */}
        {isHomePage && (
          <UniversityDropdown
            className="w-[400px] mx-6"
            onSelect={handleUniversitySelect}
          />
        )}


        {/* Action Buttons */}
        <div className={styles.actions}>
          {/* Settings dropdown */}
          <div style={{ marginLeft: "1rem" }}>
            <SettingsMenu />
          </div>

          {/* Notification bell */}
          <button
            className={styles.bell}
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-6 w-6" />
          </button>

          {/* Auth buttons */}
          <button className={styles.login} onClick={() => openModal("login")}>
            Login
          </button>
          <button className={styles.signup} onClick={() => openModal("signup")}>
            Sign Up
          </button>
        </div>

        {/* Notification popup */}
        <Notification
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />

        {/* Auth modal */}
        {showModal && (
          <AuthModal type={authType} onClose={() => setShowModal(false)} />
        )}
      </header>
    </>
  );
}
