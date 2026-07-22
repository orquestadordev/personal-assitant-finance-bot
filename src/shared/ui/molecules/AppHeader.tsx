'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun, WalletCards } from 'lucide-react';
import { useTheme } from '@/shared/hooks/useTheme';

export function AppHeader() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between bg-finance-bg px-8 pt-5">
      <WalletCards className="size-6 text-finance-primary" strokeWidth={2.4} />
      <h1 className="text-[22px] font-extrabold leading-none tracking-normal text-finance-text">
        Finanzas Personales
      </h1>
      <button
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        className="rounded-full p-1.5 transition hover:bg-finance-soft"
      >
        {mounted && theme === 'light' ? (
          <Sun className="size-6 text-finance-primary" strokeWidth={2.4} />
        ) : (
          <Moon className="size-6 text-finance-primary" strokeWidth={2.4} />
        )}
      </button>
    </header>
  );
}
