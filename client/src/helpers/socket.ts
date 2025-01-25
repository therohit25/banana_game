import Cookies from 'js-cookie';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3000', {
  extraHeaders: {
    accesstoken: Cookies.get('accesstoken') || '',
  },
});
