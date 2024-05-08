import React from "react";

type Props = { setChatId: (id: number) => void };

export default function ChatList({ setChatId }: Props) {
  return (
    <>
      <button
        className="m-2 bg-gray-600 rounded p-2 text-left text-yellow-400 font-bold"
        onClick={() => {
          setChatId(1);
        }}
      >
        Chat1
      </button>
      <button
        className="m-2 bg-gray-600 rounded p-2 text-left"
        onClick={() => {
          setChatId(2);
        }}
      >
        Chat2
      </button>
    </>
  );
}
