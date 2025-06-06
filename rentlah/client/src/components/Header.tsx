"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import AuthModal from "./AuthModal"; // <-- Make sure this file exists

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");

  const openModal = (type: "login" | "signup") => {
    setAuthType(type);
    setShowModal(true);
  };

  return (
    <header className={styles.header}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Image src="/assets/logo.png" alt="RentLah Logo" width={200} height={50} />
      </div>

      {/* Search Dropdown */}
      <div className={styles.searchContainer}>
        <div className={styles.dropdownWrapper}>
          <input
            type="text"
            placeholder="Search your university"
            className={styles.searchInput}
            readOnly
          />
          <ul className={styles.dropdown}>
            <li>National University of Singapore (NUS)</li>
            <li>Nanyang Technological University (NTU)</li>
            <li>Singapore Management University (SMU)</li>
            <li>Singapore University of Technology and Design (SUTD)</li>
            <li>Singapore Institute of Technology (SIT)</li>
            <li>Singapore University of Social Sciences (SUSS)</li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.bell}>⩍</button>
        <button className={styles.login} onClick={() => openModal("login")}>Login</button>
        <button className={styles.signup} onClick={() => openModal("signup")}>Sign Up</button>
      </div>

      {/* Modal */}
      {showModal && (
        <AuthModal type={authType} onClose={() => setShowModal(false)} />
      )}
    </header>
  );
}
