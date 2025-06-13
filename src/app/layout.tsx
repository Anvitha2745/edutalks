
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Edutalks',
  description: 'Learn English through voice calls, daily topics, and quizzes.',
  manifest: '/manifest.json', // manifest link
  themeColor: '#64B5F6',      // Corresponds to primary color
  icons: {
    apple: '/icons/icon-192x192.png', // Basic Apple touch icon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        The manual <head> tag has been removed to fix hydration errors.
        Next.js automatically generates the <head> based on the metadata object
        and hoists <link> tags like the Google Fonts below.
      */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
