import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import ChatProvider from "./context/ChatContext/ChatProvider";
import Script from "next/script";
import MessagesProvider from "./context/MessageContext/MessageContext";
import UserProvider from "./context/UserContext/UserContext";

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
      {/* <Script
        id="recaptcha"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`}
      /> */}
      <UserProvider>
        <ChatProvider>
          <MessagesProvider>
            <body className={opensans.className}>{children}</body>
          </MessagesProvider>
        </ChatProvider>
      </UserProvider>
    </html>
  );
}
