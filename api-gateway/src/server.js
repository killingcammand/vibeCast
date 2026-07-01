import express from "express";
import cors from "cors";

import authProxy from "./routes/auth.routes.js";
import videoProxy from "./routes/video.routes.js";
import commentProxy from "./routes/comment.routes.js";
import notificationProxy from "./routes/notification.routes.js";
import likeProxy from "./routes/like.routes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// app.use(express.json());

app.use("/api/auth", authProxy);
app.use("/api/videos", videoProxy);
app.use("/api/comments", commentProxy);
app.use("/api/likes", likeProxy);
app.use("/api/notifications", notificationProxy);

app.listen(8080, () => {
  console.log("Gateway running on 8080");
});