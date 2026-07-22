'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme();

  const toggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return { theme: resolvedTheme as 'dark' | 'light' | undefined, toggle };
}
