import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
// import Script from "next/script";
import UserProvider from "./context/UserContext/UserContext";
import SocketProvider from "./context/SocketProvider/SocketProvider";
import { StoreProvider } from "./store/provider";

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
      <StoreProvider>
        <SocketProvider>
          <UserProvider>
            <body className={opensans.className}>{children}</body>
          </UserProvider>
        </SocketProvider>
      </StoreProvider>
    </html>
  );
}
