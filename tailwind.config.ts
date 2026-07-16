import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1a1a2e',
          card: '#16213e',
          accent: '#0f3460',
        },
        money: {
          ars: '#4ecca3',
          usd: '#48b1ff',
        },
      },
    },
  },
  plugins: [],
};

export default config;
