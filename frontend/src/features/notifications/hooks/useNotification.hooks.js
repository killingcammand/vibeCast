import { useEffect, useState } from "react";
import { useAuth } from "../../auth/context/AuthContext.jsx";
import { getNotificationsByRecipientId } from "../services/notification.service.js";
import {
  connectNotificationSocket,
  disconnectNotificationSocket,
} from "../services/socket.service.js";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const { user } = useAuth();

  const recipientID = user?.user?.user?._id;

  useEffect(() => {
    if (!recipientID) return;

    const fetchNotifications = async () => {
      try {
        const res =
          await getNotificationsByRecipientId(
            recipientID
          );

        setNotifications(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();

    const socket =
      connectNotificationSocket(recipientID);

    socket.on(
      "new-notification",
      (notification) => {

        console.log(
          "Realtime Notification:",
          notification
        );

        setNotifications((prev) => [
          notification,
          ...prev,
        ]);
      }
    );

    return () => {
      socket.off("new-notification");
      disconnectNotificationSocket();
    };

  }, [recipientID]);

  return {
    notifications,
    setNotifications,
  };
}