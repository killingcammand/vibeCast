import {
  uploadVideoController,
  getAllVideosController,
  getVideoByIdController,
  deleteVideoController
} from "../controllers/video.controller.js";
import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { AuthenticatedRequest,verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();


// @access Private
router.post("/upload", verifyToken, upload.single("video"), uploadVideoController);
// router.get("/search", ...); // if added later
// access Public
router.get("/", getAllVideosController);
// access Public
router.get("/:id", getVideoByIdController);
//access Private
router.delete("/:id", verifyToken, deleteVideoController);

export default router;
