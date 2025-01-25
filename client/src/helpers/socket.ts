import Cookies from "js-cookie";
import { io } from "socket.io-client";

export const socket = io(import.meta.env.API_URL, {
  extraHeaders: {
    accesstoken: Cookies.get("accesstoken") || "",
  },
});
