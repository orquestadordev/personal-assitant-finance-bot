import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Finanzas Personales',
  description: 'Dashboard de gastos personales',
  manifest: '/manifest.json',
  icons: { apple: '/icon-192.png' },
};

export const viewport: Viewport = {
  themeColor: '#1a1a2e',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-dark-bg text-white antialiased">
        <main className="mx-auto max-w-md min-h-dvh px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
