"use client";

import Image from 'next/image';
import styles from './Header.module.css';
import { SettingsMenu } from '@/components/settings-menu';
import { UniversityDropdown } from '@/components/features/university-select';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const handleUniversitySelect = (uni: string) => {
    // Extract short name if it's in the full format
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  return (
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
        <button className={styles.bell}>⩍</button>
        <button className={styles.login}>Login</button>
        <button className={styles.signup}>Sign Up</button>
        {/* Settings icon dropdown */}
        <div style={{ marginLeft: '1rem' }}>
          <SettingsMenu />
        </div>
      </div>
    </header>
  );
}
