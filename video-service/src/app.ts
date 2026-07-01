import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import videoRoutes from './routes/video.routes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 🔹 Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Video Service is running 🚀" });
});

// Routes
app.use('/api/videos', videoRoutes);

export default app;
