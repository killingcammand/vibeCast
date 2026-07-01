import app from './app.js';
import mongoose from 'mongoose';
import connectDB from './config/db.config.js';
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT || 5001;
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
// Connect to MongoDB and start the server
async function startServer() {

  try {
    // Connect to MongoDB
    await connectDB();
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Video Service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit the process with failure
  } 
}

startServer();



