import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ChatProvider from "./ChatContext/ChatProvider";

const opensans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live Chat",
  description: "Live Chat application for Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ChatProvider>
        <body className={opensans.className}>{children}</body>
      </ChatProvider>
    </html>
  );
}
