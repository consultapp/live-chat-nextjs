"use client";
import Chat from "@/components/Chat/Chat";
import { clearSlug } from "@/functions/clearSlug";
import { setSlug } from "@/store/dataSlice";
import { useAppDispatch } from "@/store/hooks";
import { useLayoutEffect } from "react";

export default function ClientPage() {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(setSlug(clearSlug(window.localStorage.getItem("slug") || "")));
  }, [dispatch]);

  return <Chat />;
}
