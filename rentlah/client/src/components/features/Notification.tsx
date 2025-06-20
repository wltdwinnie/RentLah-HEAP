"use client";

import { useEffect } from "react";
import styles from "./Notification.module.css";

type NotificationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Notification({ isOpen, onClose }: NotificationProps) {
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className={`${styles.notificationPanel} ${isOpen ? styles.open : ""}`}
    >
      <div className={styles.notificationHeader}>
        <h2>Notifications</h2>
        <button
          onClick={onClose}
          className={styles.closeButton}
        >
          ✕
        </button>
      </div>
      <div className={styles.notificationContent}>
        No notifications yet.
      </div>
    </div>
  );
}
