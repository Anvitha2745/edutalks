
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import PwaRegistry from '@/components/PwaRegistry'; // New import

export const metadata: Metadata = {
  title: 'Edutalks',
  description: 'Learn English through voice calls, daily topics, and quizzes.',
  manifest: '/manifest.json', // Added manifest link for PWA metadata
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* manifest.json is now linked via Metadata API above */}
        <meta name="theme-color" content="#64B5F6" /> {/* Corresponds to primary color */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png"></link> {/* Basic Apple touch icon */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <PwaRegistry /> {/* Add the client component for SW registration */}
      </body>
    </html>
  );
}
