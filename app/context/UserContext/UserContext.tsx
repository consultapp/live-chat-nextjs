"use client";
import React, { useState } from "react";
import USER_TYPE from "@/fixtures/USER_TYPE";
import { UserContext } from ".";

type Props = { children: React.ReactElement };

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState({ userType: USER_TYPE.user });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
