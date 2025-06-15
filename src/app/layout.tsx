
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Edutalks',
  description: 'Learn English through voice calls, daily topics, and quizzes.',
};

export const viewport: Viewport = {
  themeColor: '#64B5F6', // Corresponds to primary color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        Font links have been moved to globals.css via @import
        to resolve hydration errors caused by <link> as a direct child of <html>.
        Next.js automatically generates the <head> based on the metadata object.
      */}
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
