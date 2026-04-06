import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VibeLanding — Build Landing Pages That Convert",
  description: "A production-ready landing page starter with lead capture, analytics, webhooks, and Telegram notifications.",
  openGraph: {
    title: "VibeLanding — Build Landing Pages That Convert",
    description: "Ship your MVP landing in hours with lead capture, analytics, and Telegram alerts.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeLanding — Build Landing Pages That Convert",
    description: "Ship your MVP landing in hours with lead capture, analytics, and Telegram alerts.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
