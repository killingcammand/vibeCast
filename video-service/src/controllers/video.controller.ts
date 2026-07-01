import { Request,Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middleware.js";
import { deleteVideoService, getAllVideosService, getVideoByIdService, uploadVideoService } from "../services/video.service.js";
// interface params{
//     id: string;
// }
export const uploadVideoController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        console.log("Authenticated user:", req.user);
        if(!req.user?.id){
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }
        const { title, description } = req.body;
        if(!title){
            return res.status(400).json({ message: "Title is required" });
        }
        if(!req.file){
            return res.status(400).json({ message: "Video file is required" });
        }
        //call service to upload video
      const video = await uploadVideoService({
         title,
         description,
         fileBuffer: req.file.buffer, // 🔥 IMPORTANT
         userId: req.user.id,
       });
        res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            video,
        });
    } catch (error) {
        console.error("Error in uploadVideoController:", error);
          res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error"
        });
    }
};
export const getAllVideosController = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const { videos, total } = await getAllVideosService(page, limit);
        res.status(200).json({
            success: true,
            message: "Videos retrieved successfully",
            videos,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    }catch (error) {
        console.error("Error in getAllVideosController:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error"
        });
    }
};
export const getVideoByIdController = async (req:AuthenticatedRequest, res: Response) => {
    try {
        const videoId = req.params.id as string;
        if(!videoId){
            return res.status(400).json({ message: "Video ID is required" });
        }
        //call service to get video by id
        const video = await getVideoByIdService(videoId);
        res.status(200).json({
            success: true,
            message: "Video retrieved successfully",
            video
        });
    } catch (error) {
        console.error("Error in getVideoByIdController:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error"
        });
    }
};
export const deleteVideoController = async (req:AuthenticatedRequest, res: Response) => {
    try {
        if(!req.user?.id){
            return res.status(401).json({ 
                success: false,
                message: "Unauthorized: User not authenticated" 
            });
        }   
        const videoId = req.params.id as string;
        if(!videoId){
            return res.status(400).json({
                success: false,
                message: "Video ID is required"
            });    
        }
        //call service to delete video
        const result = await deleteVideoService(videoId, req.user.id);
        res.status(200).json({
            success: true,
            message: result.message
        });
    } catch (error) {
        console.error("Error in deleteVideoController:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "Internal Server Error"
        });
    }
};
