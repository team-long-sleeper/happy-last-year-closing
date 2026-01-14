import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Last Year Closing",
  description: "에피소드 연말결산",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-dvh">{children}</body>
    </html>
  );
}
