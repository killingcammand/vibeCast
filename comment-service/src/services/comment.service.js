import  prisma  from "../../prisma/client.prisma.js";
import axios from "axios";
import { getChannel }
from "../config/rabbitMQ.config.js";
import {getIO} from "../config/socket.config.js";


export const createCommentService = async ({
  videoID,
  text,
  timeStamp,
  parentID,
  userID,
}) => {

  const comment = await prisma.comment.create({
    data: {
      videoID,
      userID,
      text,
      timestamp: new Date(),
      parentID: parentID ?? null,
    },
  });


  console.log("Comment created:", comment);
  const io = getIO();
  io.to(videoID).emit("new-comment", comment);
  // Reply notification
  if (parentID) {

    const parentComment =
      await prisma.comment.findUnique({
        where: {
          id: parentID,
        },
      });

    if (
      parentComment &&
      parentComment.userID !== userID
    ) {

      const channel = getChannel();
      console.log("Sending notification for comment reply:", {
        type: "COMMENT_REPLY_CREATED",
        recipientID: parentComment.userID,
        senderID: userID,
        commentID: comment.id,
        videoID,
      });
      channel.sendToQueue(
        "notification_queue",

        Buffer.from(
          JSON.stringify({
            type: "COMMENT_REPLY_CREATED",

            recipientID:
              parentComment.userID,

            senderID: userID,

            commentID: comment.id,

            videoID,
          })
        ),

        {
          persistent: true,
        }
      );
    }
  }

  return comment;
};

export const getCommentsByVideoIdService = async (videoID) => {
  console.log("Fetching comments for videoID:", videoID);
    return await prisma.comment.findMany({
        where: { videoID: videoID ,
          parentID: null, // Only fetch top-level comments
        },
        include: {
            replies: true, // Include replies to the comment
        },
        orderBy: { createdAt: "asc" },
    });
};

