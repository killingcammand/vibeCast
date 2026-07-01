import express from "express";

import cors from "cors";

import notificationRoutes from "./routes/notification.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.send("Notification Service is running");
});

export default app;