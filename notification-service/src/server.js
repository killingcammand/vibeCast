import dotenv from "dotenv";
dotenv.config();    
import app from "./app.js";
import connectDB from "./configs/db.config.js";
import http from "http";

import { startConsumer }
from "./configs/rabbitMQ.config.js";
import {initSocket} from "./configs/socket.config.js";



const PORT = process.env.PORT || 5004;

connectDB();
const server = http.createServer(app);
initSocket(server);
await startConsumer();
server.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
});

