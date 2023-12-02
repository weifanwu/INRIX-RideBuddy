import { io } from "socket.io-client";

const socket = io('http://127.0.0.1:5000', {
    transports: ['websocket'],
    cors: {
      origin: 'http://localhost:3000/',
    },
  });

export default socket;