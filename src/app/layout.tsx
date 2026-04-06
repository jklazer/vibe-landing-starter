import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "VibeLanding — Лендинги, которые конвертируют",
  description: "Готовый стартер лендинга с формой заявки, аналитикой конверсий, вебхуками и Telegram-уведомлениями.",
  openGraph: {
    title: "VibeLanding — Лендинги, которые конвертируют",
    description: "Запустите MVP-лендинг за часы: форма заявки, аналитика, оповещения в Telegram.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeLanding — Лендинги, которые конвертируют",
    description: "Запустите MVP-лендинг за часы: форма заявки, аналитика, оповещения в Telegram.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
