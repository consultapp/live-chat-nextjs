"use client";
import Chat from "@/components/Chat/Chat";
import Link from "next/link";

export default function HomePage() {
  const clearData = () => {
    window.localStorage.setItem("chatSlug", "");
  };

  return (
    <div className="mt-4 bg-white p-4 rounded">
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
        <button onClick={clearData} className="btn">
          Clear Data
        </button>
      </div>
    </div>
  );
}
