import { toggleLikeService,getLikesCountService } from "../services/like.service.js";

export const toggleLikeController = async (req, res) => {
    try{
        const {targetID,targetType,videoID} = req.body;
        const userID = req.user.id;
        const result = await toggleLikeService({userID,targetID:String(targetID),targetType,videoID});
        res.status(200).json({
            success: result.success,
            message: result.message,
        });
    }catch(error){
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getLikesCountController = async (req, res) => {
    try{
        console.log("Request query parameters:", req.query);
        const {targetID,targetType} = req.query;
        const result = await getLikesCountService({targetID,targetType});
        res.status(200).json({
            success: result.success,
            message: result.message,
            count: result.count
        });
    }catch(error){
        console.error("Error retrieving likes count:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};