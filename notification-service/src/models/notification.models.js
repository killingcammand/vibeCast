import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    
    recipientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    senderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "LIKE",
        "COMMENT",
        "FOLLOW",
        "REPLY",
        "VIDEO_UPLOADED",
        "LIVE_STARTED",
        "SYSTEM",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    entityID: {
      type: String,
    },

    entityType: {
      type: String,
      enum: ["VIDEO", "COMMENT", "USER"],
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({
  recipientID: 1,
  createdAt: -1,
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;