import {createCommentService, getCommentsByVideoIdService} from "../services/comment.service.js";

export const createCommentController = async (req, res) => {
    try {
        const {videoID, text, parentID} = req.body;
        const userID = req.user.id; // Assuming req.user is set by authentication middleware
        const newComment = await createCommentService({videoID, text, parentID, userID});
        res.status(201).json({
            success: true,
            message: "Comment created successfully",
            comment: newComment,
        });
    }
    catch (error) {
        console.error("Error creating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCommentsByVideoIdController = async (req, res) => {
    try {
        const { videoID } = req.params;
        const comments = await getCommentsByVideoIdService(videoID);
        // console.log("Comments retrieved:", comments);
        res.status(200).json({
            success: true,
            message: "Comments retrieved successfully",
            comments,
        });
    }catch (error) {
        console.error("Error retrieving comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
