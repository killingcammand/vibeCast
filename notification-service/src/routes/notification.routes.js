import express from "express";
import {
  createNotificationController,
  getNotificationsByUserIdController,
  markNotificationAsReadController,
  deleteNotificationController
} from '../controllers/notificatin.controllers.js';
import { verifyToken } from "../middlewares/auth.middleware.js";
const router = express.Router();



router.post("/",verifyToken, createNotificationController);

router.get("/:recipientID", verifyToken, getNotificationsByUserIdController);

router.patch("/:notificationID/read", verifyToken, markNotificationAsReadController);

router.delete("/:notificationID", verifyToken, deleteNotificationController);

export default router;