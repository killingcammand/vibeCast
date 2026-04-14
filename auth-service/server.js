import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/auth.routes.js';
import { errorMiddleware } from './src/middleware/error.middleware.js';
import connectDB from './src/config/db.config.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app=express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);

app.use(errorMiddleware);

const PORT=process.env.PORT || 5000;
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
});