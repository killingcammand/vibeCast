import { io } from "socket.io-client";

let socket = null;

export const connectNotificationSocket = (userID) => {
  if (!userID) return null;

  socket = io("http://localhost:5004", {
    query: { userID },
    withCredentials: true,
  });

  return socket;
};

export const getNotificationSocket = () => socket;

export const disconnectNotificationSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};