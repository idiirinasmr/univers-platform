import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Univers Platform — Одна платформа, любой бизнес",
  description: "Готовая бизнес-платформа под любую нишу за 2 недели. CRM, AI-агент, Telegram, личные кабинеты. Стоматология, бьюти, ресторан, онлайн-школа и другие.",
  keywords: "CRM, AI-агент, бизнес-платформа, автоматизация, Telegram-бот, онлайн-запись",
  openGraph: {
    title: "Univers Platform — Одна платформа, любой бизнес",
    description: "Готовая платформа под любую нишу за 2 недели. CRM, AI-агент, Telegram.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
