"use client";

import { useState, useEffect, Suspense } from "react";
import styles from "./ResetPassword.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";


// Client component that uses useSearchParams
const ResetPasswordClient = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [resetSuccess, setResetSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const { resolvedTheme } = useTheme();

    
    // Get token safely with useEffect
    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) {
            console.log("No token found, redirecting to home");
            router.push("/");
        } else {
            setIsLoading(false);
        }
    }, [searchParams, router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        }
        
        if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
      if (!/[A-Z]/.test(password)) {
        setErrorMessage("Password must contain an uppercase letter.");
        return;
      }
      if (!/[a-z]/.test(password)) {
        setErrorMessage("Password must contain a lowercase letter.");
        return;
      }
      if (!/[0-9]/.test(password)) {
        setErrorMessage("Password must contain a number.");
        return;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(password)) {
        setErrorMessage("Password must contain a special character.");
        return;
      }
        
        try {
            setIsLoading(true);
            const token = searchParams.get("token");
            if (!token) {
                console.error("Token missing");
                return;
            }
            
            await authClient.resetPassword({
                newPassword: password,
                token
            });
            setResetSuccess(true);
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } catch (error) {
            console.error("Password reset failed:", error);
            setErrorMessage("Failed to reset password. Please try again or request a new reset link.");
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <div className={styles.resetPasswordPage}>
                <div className={styles.authForm}>
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingSpinner}></div>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Show success state
    if (resetSuccess) {
        return (
            <div className={styles.resetPasswordPage}>
                <div className={styles.authForm}>
                    <div className={styles.logoContainer}>
                        <Image 
                            src="/assets/logo.png" 
                            alt="RentLah Logo" 
                            width={150} 
                            height={40} 
                        />
                    </div>
                    <div className={styles.successContainer}>
                        <CheckCircle size={50} className={styles.successIcon} />
                        <h2>Password Reset Successful!</h2>
                        <p className={styles.successMessage}>
                            Your password has been updated. You will be redirected to the home page shortly.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.resetPasswordPage}>
            <form className={styles.authForm} onSubmit={handleSubmit}>
                <div className={styles.logoContainer}>
                    <Image 
                        src="/assets/logo.png" 
                        alt="RentLah Logo" 
                        width={150} 
                        height={40} 
                    />
                </div>
                <h2>Reset Password</h2>
                <div className={styles.formIcon}>
                    <Lock size={24} />
                </div>
                
                {errorMessage && (
                    <div className={styles.errorMessage}>
                        {errorMessage}
                    </div>
                )}
                
                <div className={styles.inputGroup}>
                    <label htmlFor="password">New Password</label>
                    <div className={styles.inputContainer}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter new password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={styles.iconButton}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <Eye className={styles.eyeIcon} />
                            ) : (
                                <EyeOff className={styles.eyeIcon} />
                            )}
                        </button>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className={styles.inputContainer}>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className={styles.iconButton}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? (
                                <Eye className={styles.eyeIcon} />
                            ) : (
                                <EyeOff className={styles.eyeIcon} />
                            )}
                        </button>
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>Reset Password</button>
            </form>
        </div>
    );
};

// Export default component with Suspense boundary
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}