import Cookies from "js-cookie";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_URL, {
  extraHeaders: {
    accesstoken: Cookies.get("accesstoken") || "",
  },
  transports: ["websocket"],
});
