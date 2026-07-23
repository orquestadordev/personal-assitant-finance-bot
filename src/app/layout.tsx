import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@/shared/providers/ThemeProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Finanzas Personales',
  description: 'Dashboard de gastos personales',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Finanzas',
  },
};

export const viewport: Viewport = {
  themeColor: '#08110d',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-finance-bg text-finance-text antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <main className="mx-auto min-h-dvh max-w-[430px] bg-finance-bg">
            {children}
          </main>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
