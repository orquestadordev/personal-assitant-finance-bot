import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: 'rgb(var(--color-app-bg) / <alpha-value>)',
          card: 'rgb(var(--color-surface) / <alpha-value>)',
          accent: 'rgb(var(--color-surface-soft) / <alpha-value>)',
        },
        finance: {
          bg: 'rgb(var(--color-app-bg) / <alpha-value>)',
          surface: 'rgb(var(--color-surface) / <alpha-value>)',
          raised: 'rgb(var(--color-surface-raised) / <alpha-value>)',
          soft: 'rgb(var(--color-surface-soft) / <alpha-value>)',
          nav: 'rgb(var(--color-nav) / <alpha-value>)',
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          text: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          stroke: 'rgb(var(--color-stroke) / <alpha-value>)',
        },
        money: {
          ars: 'rgb(var(--color-money-ars) / <alpha-value>)',
          usd: 'rgb(var(--color-money-usd) / <alpha-value>)',
        },
      },
      borderRadius: {
        app: '28px',
        card: '14px',
        pill: '999px',
      },
      boxShadow: {
        nav: '0 -18px 42px rgba(6, 15, 11, 0.72)',
        glow: '0 0 34px rgba(78, 204, 163, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
