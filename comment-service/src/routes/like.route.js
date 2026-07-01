import express from "express";
import { toggleLikeController, getLikesCountController } from "../controllers/like.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/toggle", verifyToken, toggleLikeController);
router.get("/count", verifyToken, getLikesCountController);

export default router;