"use client";

import Image from 'next/image';
import styles from './Header.module.css';
import Link from 'next/link';
import { UniversityDropdown } from '@/components/features/university-select';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from "react";
import { Bell } from "lucide-react";
import Notification from "../features/Notification";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleUniversitySelect = (uni: string) => {
    // Extract short name if it's in the full format
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  return (
    <>
    <header className={styles.header}>
      {/* Temporary logo */}
      <div className={styles.logoContainer}>
        <Image src="/assets/logo.png" alt="RentLah Logo" width={200} height={50} /> 
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
          <button 
            className={styles.bell}
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          >
            <Bell className="h-6 w-6" />
          </button>

          <button className={styles.login}>Login</button>
          <button className={styles.signup}>Sign Up</button>
        </div>
      </header>
      <Notification
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
    </>
  );
}
