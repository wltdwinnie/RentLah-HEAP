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

export default function AuthModal({ onClose, type }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");

  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmailSent, setForgotEmailSent] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResendSuccess("");

    if (type === "signup") {
      if (password.length < 8) {
        setError("Password must be at least 8 characters long.");
        setLoading(false);
        return;
      }
      if (!/[A-Z]/.test(password)) {
        setError("Password must contain an uppercase letter.");
        setLoading(false);
        return;
      }
      if (!/[a-z]/.test(password)) {
        setError("Password must contain a lowercase letter.");
        setLoading(false);
        return;
      }
      if (!/[0-9]/.test(password)) {
        setError("Password must contain a number.");
        setLoading(false);
        return;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(password)) {
        setError("Password must contain a special character.");
        setLoading(false);
        return;
      }

      const res = await authClient.signUp.email({
        email,
        password,
        name: name || email.split("@")[0],
      });

      if (res.error) {
        const msg = res.error?.message?.toLowerCase() || "";

        if (msg.includes("already exists")) {
          setError("Account already exists. Try logging in.");
        } else {
          setError(res.error.message || "Signup failed.");
        }

        setLoading(false);
        return;
      }

      // localStorage.setItem("auth_email", email);
      // localStorage.setItem("auth_password", password);

      setJustSignedUp(true);
      setLoading(false);
      return;
    }

    if (type === "login") {
      const result = await authClient.signIn.email({ email, password });
      console.log(result);
      if (result.error !== null) {
        if(result.error.message === "Email not verified") {
          setError("Email not verified. Please check your inbox.");
        } else{
          setError("Invalid Email or Password. Please try again.");
        }
        setLoading(false);
        return;
      }

      onClose();
      window.location.reload();
    }

    setLoading(false);
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    setError("");
    setForgotMode(true);
  };

  const handleForgotSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    try {
      await authClient.requestPasswordReset({
        email,
        redirectTo: "/reset-password",
      });
      setForgotEmailSent(true);
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendLoading(true);
    setResendSuccess("");
    try {
      await authClient.sendVerificationEmail({ email, callbackURL: "/" });
      setResendSuccess("Verification email resent! Check your inbox.");
    } catch (err: any) {
      setError(err.message || "Failed to resend verification email.");
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({ provider: "google" });
      const session = await authClient.getSession();
      console.log("After Google sign-in session:", session);
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
        <h2>
          {forgotMode
            ? "Reset Password"
            : type === "signup"
            ? "Create Account"
            : "Login"}
        </h2>

        {justSignedUp ? (
          <div className={styles.verificationNotice}>
            <p>✅ Sign up successful!</p>
            <p>Please check your email to verify your account.</p>
            {resendSuccess && <p className={styles.success}>{resendSuccess}</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button
              className={styles.submitBtn}
              onClick={handleResendVerification}
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend Verification Email"}
            </button>
          </div>
        ) : forgotMode ? (
          <form onSubmit={handleForgotSubmit} className={styles.form}>
            {error && <div className={styles.errorMessage}>{error}</div>}

            {forgotEmailSent ? (
              <div className={styles.success}>
                ✅ A reset link has been sent.
              </div>
            ) : (
              <>
                <p className={styles.instructions}>
                  Enter your email to receive a password reset link.
                </p>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </>
            )}
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className={styles.form}>
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
              {type === "login" && (
                <button
                  onClick={handleForgotPassword}
                  className={styles.forgotPasswordBtn}
                  type="button"
                >
                  Forgot Password?
                </button>
              )}
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
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
          </>
        )}
      </div>
    </div>
  );
}
