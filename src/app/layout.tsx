import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeCollab - Real-time Collaborative Code Editor",
  description: "A real-time collaborative code editor with powerful features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
