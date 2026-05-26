import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TimeQue — Gamified Reminder App",
  description: "Transform your daily habits into an epic quest. TimeQue is the gamified reminder app that makes productivity legendary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="grain">
        {children}
      </body>
    </html>
  );
}
