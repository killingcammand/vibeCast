// routes/comment.routes.js
import express from "express";
import { createCommentController,getCommentsByVideoIdController} from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, createCommentController);
router.get("/:videoID", verifyToken, getCommentsByVideoIdController);

export default router;