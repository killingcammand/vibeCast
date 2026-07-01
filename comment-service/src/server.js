import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "./app.js";
import { connectRabbitMQ } from "./config/rabbitMQ.config.js";
import { initSocket } from "./config/socket.config.js";

const PORT = process.env.PORT || 5002;

await connectRabbitMQ();

const server = http.createServer(app);

initSocket(server);

server.listen(PORT, () => {
  console.log(`Comment Service running on port ${PORT}`);
});