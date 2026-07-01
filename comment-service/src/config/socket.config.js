import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Comment socket connected:", socket.id);

    socket.on("join-video", (videoID) => {
      socket.join(videoID);
      console.log(`Socket ${socket.id} joined video ${videoID}`);
    });

    socket.on("disconnect", () => {
      console.log("Comment socket disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => io;