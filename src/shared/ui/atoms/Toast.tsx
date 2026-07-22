'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, visible, onDismiss, duration = 3500 }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      // Small delay for enter animation
      requestAnimationFrame(() => setShow(true));
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onDismiss, 300); // wait for exit animation
      }, duration);
      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [visible, duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300
        ${show ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
    >
      <div className="flex items-center gap-2.5 rounded-full bg-finance-primary px-5 py-3 shadow-lg">
        <span className="text-[15px]">💰</span>
        <span className="text-[14px] font-bold text-finance-bg whitespace-nowrap">{message}</span>
      </div>
    </div>
  );
}
