import {
  createNotificationService,
  getNotificationsByRecipientIdService,
  markNotificationAsReadService,
  deleteNotificationService,
} from "../services/notification.services.js";
import { emitNotificationToUser } from "../services/socket.service.js";
/* ===========================
   HTTP Controllers
=========================== */

export const createNotificationController = async (req, res) => {
  try {
    const senderID = req.user.id;
    const recipientID = req.body.recipientID;

    const {
      type,
      message,
      entityID,
      entityType,
    } = req.body;

    const notification =
      await createNotificationService({
        recipientID,
        senderID,
        type,
        message,
        entityID,
        entityType,
      });

    res.status(201).json(notification);
      
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create notification",
    });
  }
};

export const getNotificationsByUserIdController = async (req, res) => {
  try {

    const recipientID = req.user.id;

    const notifications =
      await getNotificationsByRecipientIdService(
        recipientID
      );

    res.status(200).json(notifications);

  } catch (error) {

    res.status(500).json({
      error: "Failed to fetch notifications",
    });

  }
};

export const markNotificationAsReadController = async (req, res) => {
  try {

    const notification =
      await markNotificationAsReadService(
        req.params.notificationID
      );

    res.status(200).json(notification);

  } catch (error) {

    res.status(500).json({
      error: "Failed to mark notification as read",
    });

  }
};

export const deleteNotificationController = async (req, res) => {
  try {

    await deleteNotificationService(
      req.params.notificationID
    );

    res.status(204).json({
      message: "Notification deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      error: "Failed to delete notification",
    });

  }
};

/* ===========================
   RabbitMQ Event Controller
=========================== */

export const handleNotificationEvent = async (event) => {

  switch (event.type) {

    case "COMMENT_REPLY_CREATED":

      const notification=await createNotificationService({

        recipientID: event.recipientID,

        senderID: event.senderID,

        type: "REPLY",

        message: "Someone replied to your comment",

        entityID: event.commentID,

        entityType: "COMMENT",

      });
      emitNotificationToUser(event.recipientID,notification);
      console.log("Reply notification saved and emitted:", notification);

      break;

    default:

      console.log("Unknown Event:", event.type);
  }

};