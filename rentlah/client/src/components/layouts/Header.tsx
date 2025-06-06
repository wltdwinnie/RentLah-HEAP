'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import { UniversityDropdown } from '@/components/features/university-select';
import { usePathname, useRouter } from 'next/navigation';
import AuthModal from '../features/login/sign up/AuthModal';

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');

  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const openModal = (type: 'login' | 'signup') => {
    setAuthType(type);
    setShowModal(true);
  };

  const handleUniversitySelect = (uni: string) => {
    const match = uni.match(/\(([^)]+)\)/);
    const shortName = match ? match[1] : uni;
    router.push(`/filter?university=${encodeURIComponent(shortName)}`);
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image src="/assets/logo.png" alt="RentLah Logo" width={200} height={50} />
      </div>

      {/* University dropdown (only show on home page) */}
      {isHomePage && (
        <UniversityDropdown 
          className="w-[400px] mx-6"
          onSelect={handleUniversitySelect}
        />
      )}

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.bell}>⩍</button>
        <button className={styles.login} onClick={() => openModal('login')}>Login</button>
        <button className={styles.signup} onClick={() => openModal('signup')}>Sign Up</button>
      </div>

      {/* Auth Modal */}
      {showModal && (
        <AuthModal type={authType} onClose={() => setShowModal(false)} />
      )}
    </header>
  );
}
