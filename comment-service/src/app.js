import express from 'express';
import cors from 'cors';
import commentRoutes from './routes/comment.route.js';
import likeRoutes from './routes/like.route.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 🔹 Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Video Service is running 🚀" });
});

// Routes
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);

export default app;
