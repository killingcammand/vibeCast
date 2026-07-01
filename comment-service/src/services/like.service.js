import  prisma  from "../../prisma/client.prisma.js";

export const toggleLikeService  = async ({userID,targetID,targetType,videoID}) => {
    try{
        await prisma.like.create({
            data:
            {userID:userID,
                targetID:String(targetID),
                targetType,
                videoID:videoID}
        });
        return ({
            success: true,
            message: "Liked successfully",
        });
    }catch(error){
        if (error.code === 'P2002') {
          await prisma.like.delete({
  where: {
    videoID_userID_targetType_targetID: {
      videoID:videoID,
      userID:userID,
      targetType,
      targetID:String(targetID)
    }
  }
});
            return ({
                success: true,
                message: "Unliked successfully",
            });
        }
        console.error("Error toggling like:", error);
        throw new Error("Internal server error");
    }    
};
export const getLikesCountService = async ({targetID,targetType}) => {
    try{
        const count = await prisma.like.count({
            where: {
                targetID: String(targetID),
                targetType
            },
        });
        return ({
            success: true,
            message: "Likes count retrieved successfully",
            count
        });
    }catch(error){
        console.error("Error retrieving likes count:", error);
        throw new Error("Internal server error");
    }
};

