"use client";
import Link from "next/link";
import { useChatSlug, useMessageDispatch } from "./context/MessageContext";
import { useLayoutEffect } from "react";

export default function HomePage() {
  const dispatch = useMessageDispatch();
  const chatSlug = useChatSlug();
  let windowSlug = "";

  const clearData = () => {
    window.localStorage.setItem("chatSlug", "");
    dispatch({ type: "setChatSlug", payload: "" });
  };

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    windowSlug = (window.localStorage.getItem("chatSlug") as string) || "";
  }, []);

  return (
    <div className="mt-4 bg-white p-4 rounded m-auto sm:w-full md:w-400">
      <div>
        <ul className=" underline">
          <li>
            <Link href="/admin">Admin</Link>
          </li>
          <li>
            <Link href="/client">Client</Link>
          </li>
        </ul>
      </div>
      <div className="mt-2">
        <button
          onClick={clearData}
          className="btn"
          disabled={!(chatSlug || windowSlug)}
        >
          Clear Data
        </button>
      </div>
    </div>
  );
}
