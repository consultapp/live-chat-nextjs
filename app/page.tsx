"use client";
import Link from "next/link";
import { setSlug } from "./store/dataSlice";
import { useAppDispatch } from "./store/hooks";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const clearData = () => {
    dispatch(setSlug(""));
  };

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
        <button onClick={clearData} className="btn">
          Clear Data
        </button>
      </div>
    </div>
  );
}
