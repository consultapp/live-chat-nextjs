import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
// import Script from "next/script";
import MessagesProvider from "./context/MessageContext/MessageContext";
import UserProvider from "./context/UserContext/UserContext";
import SocketProvider from "./context/SocketProvider/SocketProvider";

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
        <SocketProvider>
          <MessagesProvider>
            <body className={opensans.className}>{children}</body>
          </MessagesProvider>
        </SocketProvider>
      </UserProvider>
    </html>
  );
}
