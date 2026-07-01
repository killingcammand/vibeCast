import { getIO } from "../configs/socket.config.js";


export const emitNotificationToUser = (userID, notification) => {
  const io = getIO();

  io.to(String(userID)).emit(
    "new-notification",
    notification
  );
};