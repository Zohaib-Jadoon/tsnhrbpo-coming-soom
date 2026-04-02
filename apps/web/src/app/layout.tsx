import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TSNHRBPO | AI-Powered Recruitment Platform",
  description: "Pakistan's smartest AI recruitment platform. Eliminating hiring noise and matching top talent with elite employers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-[#020617] text-white selection:bg-cyan-500/30 selection:text-cyan-100`}>
        {children}
      </body>
    </html>
  );
}
