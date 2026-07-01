import { io } from "socket.io-client";

let socket = null;

export const connectCommentSocket = () => {
  if (socket) return socket;

  socket = io("http://localhost:5002", {
    withCredentials: true,
  });

  return socket;
};

export const joinVideoRoom = (videoID) => {
  if (!socket) return;
  socket.emit("join-video", videoID);
};

export const listenForNewComments = (callback) => {
  if (!socket) return;
  
  socket.on("new-comment", callback);
};

export const removeNewCommentListener = () => {
  if (!socket) return;
  socket.off("new-comment");
};

export const disconnectCommentSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};