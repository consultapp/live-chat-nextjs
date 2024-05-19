"use client";
import { io } from "socket.io-client";

export const socket = io(
  process.env.NODE_ENV === "production"
    ? "ws://" + process.env.PRODUCTION_DOMAIN + "/socket"
    : ""
);
