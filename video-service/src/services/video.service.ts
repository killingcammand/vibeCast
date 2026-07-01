import cloudinary from "../config/cloudinary.config.js";
import Video from "../prisma/video.model.js";
import streamifier from "streamifier";

interface uploadVideoInput {
  title: string;
  description?: string;
  fileBuffer: Buffer; // 🔥 changed
  userId: string;
}

export const uploadVideoService = async ({
  title,
  description,
  fileBuffer,
  userId,
}: uploadVideoInput) => {
  try {
    const result: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "vibeCast/video-service/videos",
          quality: "auto",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(fileBuffer).pipe(stream);
    });

    // ✅ correct thumbnail
    const thumbnailUrl = cloudinary.url(result.public_id, {
      resource_type: "video",
      format: "jpg",
      transformation: [{ width: 300, height: 200, crop: "fill" }],
    });

     // ✅ HLS Streaming URL (.m3u8)
    const streamUrl = cloudinary.url(result.public_id, {
      resource_type: "video",
      format: "m3u8",
    });

    const video = await Video.create({
      title,
      description,
      videoUrl: result.secure_url,
      thumbnailUrl,
      streamUrl, // ✅ save stream URL
      userId,
      publicId: result.public_id,
    });

    return video;

  } catch (error) {
    console.error("Error uploading video:", error);
    throw new Error("Failed to upload video");
  }
};
export const getAllVideosService = async (
    page:number=1,
    limit:number=10
) => {
    try{
        const skip=(page-1)*limit;
        const [videos, total]=await Promise.all([
            Video.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
            Video.countDocuments()
        ]);

        return {
            videos,
            total,
            page,
            pages: Math.ceil(total/limit)
        }
    }catch(error){
        console.error("Error fetching videos:", error);
        throw new Error("Failed to fetch videos");
    }
}
export const getVideoByIdService = async (videoId:string) => {
    try{
        console.log("Fetching video with ID:", videoId);
        const video=await Video.findById(videoId);
        if(!video){
            throw new Error("Video not found");
        }
        //increment view count
        video.views+=1;
        await video.save();
        return video;
    }catch(error){
        console.error("Error fetching video by ID:", error);
        throw new Error("Failed to fetch video");
    }
};
export const deleteVideoService = async (videoId:string, userId:string) => {
    try{
        const video=await Video.findById(videoId);
        if(!video){
            throw new Error("Video not found");
        }
        if(video.userId!==userId){
            throw new Error("Unauthorized");
        }
        //delete video from cloudinary
        await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });
        //delete video from database
        await Video.findByIdAndDelete(videoId);
        return { message: "Video deleted successfully" };
    }
    catch(error){
        console.error("Error deleting video:", error);
        throw new Error("Failed to delete video");
    }
};
