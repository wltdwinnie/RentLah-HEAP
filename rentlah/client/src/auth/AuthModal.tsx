"use client";

import { useState } from "react";
import styles from "./AuthModal.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  onClose: () => void;
  type: "login" | "signup";
};

// Update your AuthModal.tsx
export default function AuthModal({ onClose, type }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Add name field
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ensure the page doesn't reload

    console.log("✅ handleSubmit called"); // Ensure function triggers

    setLoading(true);
    setError("");

    try {
      if (type === "signup") {
        console.log("🟡 Signing up with:", email);

        if (password.length < 8) {
          setError("Password must be at least 8 characters long.");
          return;
        }
        if (!/[A-Z]/.test(password)) {
          setError("Password must contain an uppercase letter.");
          return;
        }
        if (!/[a-z]/.test(password)) {
          setError("Password must contain a lowercase letter.");
          return;
        }
        if (!/[0-9]/.test(password)) {
          console.log("Password must contain a number.");
          setError("Password must contain a number.");
          return;
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
          setError("Password must contain a special character.");
          return;
        }

        const res = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0],
        });

        console.log("✅ Signup success:", res);  
        onClose();
        window.location.reload();
      } else if (type === "login") {
        console.log("🟡 Logging in with:", email);

        try {
          const result = await authClient.signIn.email({ email, password });
          console.log("✅ Login success:", result);

          // Only run these when sign-in actually succeeds
          alert("Login successful!");
          onClose();
          window.location.reload();
        } catch (err: any) {
          console.error("🔥 Login error:", err);
          const msg =
            err.message ||
            err?.response?.data?.message ||
            "Authentication failed.";
          setError(msg);
        }
      }
    } catch (error: any) {
      console.error("🔥 Auth error:", error);
      const msg =
        error?.message ||
        error?.response?.data?.message ||
        "Authentication failed.";
      setError(msg);
      alert(`Error: ${msg}`); // Alert error
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
      const session = await authClient.getSession();
      console.log("After Google sign-in session:", session);
      console.log("Session response:", await authClient.getSession());
      onClose();
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>
          ×
        </button>
        <h2>{type === "signup" ? "Create Account" : "Login"}</h2>

        <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
          {error && <div className={styles.errorMessage}>{error}</div>}

          {type === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <div className={styles.passwordInputContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={styles.passwordInput}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordToggle}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={20} className={styles.eyeIcon} />
              ) : (
                <Eye size={20} className={styles.eyeIcon} />
              )}
            </button>
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading
              ? "Please wait..."
              : type === "signup"
              ? "Sign Up"
              : "Login"}
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <div className={styles.socialLogin}>
          <button onClick={handleGoogleSignIn} className={styles.googleBtn}>
            <Image
              src="/assets/google-logo.png"
              alt="Google logo"
              width={20}
              height={20}
            />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
