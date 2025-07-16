import styles from './Footer.module.css';
import { Mail, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.contacts}>
        <a
          href="mailto:rentlahsg@gmail.com"
          className={styles.contactItem}
          title="Email"
        >
          <Mail className="h-6 w-6" />
        </a>
        <a
          href="https://instagram.com/rentlahsg"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
          title="Instagram"
        >
          <Instagram className="h-6 w-6" />
        </a>
        <a
          href="https://facebook.com/rentlahsg"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.contactItem}
          title="Facebook"
        >
          <Facebook className="h-6 w-6" />
        </a>
      </div>
      <br></br>
      <div className={styles.text}>
        &copy; {currentYear} RentLah. All rights reserved.
      </div>
    </footer>
  );
}
