"use client";

import LoginForm from "@/components/LoginForm/LoginForm";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(UserContext);

  return <>{user.token ? children : <LoginForm />}</>;
}
