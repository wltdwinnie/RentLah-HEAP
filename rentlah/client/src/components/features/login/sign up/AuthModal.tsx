// components/AuthModal.tsx
'use client';

import { useState } from 'react';
import styles from './AuthModal.module.css';
import Image from 'next/image';

type Props = {
  onClose: () => void;
  type: 'login' | 'signup';
};

export default function AuthModal({ onClose, type }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = type === 'signup' ? '/api/auth/register' : '/api/auth/login';
    const res = await fetch(`http://localhost:5000${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
      alert(`${type} successful`);
      onClose();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.close}>×</button>
        <h2>{type === 'signup' ? 'Create Account' : 'Login'}</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            {type === 'signup' ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <div className={styles.divider}>or</div>
        <div className={styles.socialLogin}>
        <a href="http://localhost:5000/api/auth/google" className={styles.googleBtn}>
          <Image src="/assets/google-logo.png" alt="Google logo" width={20} height={20} />
          <span>Continue with Google</span>
        </a>
        <a href="http://localhost:5000/api/auth/facebook" className={styles.googleBtn}>
          <Image src="/assets/facebook-logo.png" alt="Facebook logo" width={20} height={20} />
          <span>Continue with Facebook</span>
        </a>
        </div>
      </div>
    </div>
  );
}
