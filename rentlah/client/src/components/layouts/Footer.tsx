import styles from "./Footer.module.css";
import { Mail, Instagram, Facebook } from "lucide-react";
import AddPropertyButton from "./AddPropertyButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerRow}>
        <div className={styles.contactColumn}>
          <div className={styles.contactText}>
            Connect with us!
          </div>
          <div className={styles.contactRow}>
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
        </div>
        <div className={styles.ctaColumn}>
          <div className={styles.ctaText}>
            List your housing here for students!
          </div>
          <AddPropertyButton />
        </div>
      </div>
      <br></br>
      <div className={styles.text}>
        &copy; {currentYear} RentLah. All rights reserved.
      </div>
    </footer>
  );
}
