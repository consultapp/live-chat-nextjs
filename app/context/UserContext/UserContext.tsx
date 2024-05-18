"use client";
import React, { useState } from "react";
import USER_TYPE from "@/fixtures/USER_TYPE";
import { UserContext } from ".";
import { IUser } from "../../types";

type Props = { children: React.ReactElement };

export default function UserProvider({ children }: Props) {
  const [user, setUser] = useState<IUser>({ userType: USER_TYPE.user });
  console.log("==== Component UserProvider ====");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
