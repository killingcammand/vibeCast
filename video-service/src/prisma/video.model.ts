import mongoose,{Document} from "mongoose";

export interface IVideo extends Document{
    title: string;
    description?: string;
    videoUrl: string;
    thumbnailUrl?: string;
    userId: string;
    views: number;
    createdAt: Date;
    updatedAt: Date;
    publicId: string;
    streamUrl?: string;

}

const videoSchema = new mongoose.Schema<IVideo>({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        required: true,
        trim: true
    },
    thumbnailUrl: {
        type: String,
        trim: true
    },
    userId: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    publicId: {
       type: String,
       required: true,
       unique: true
    },
    streamUrl: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Video = mongoose.model<IVideo>('Video', videoSchema);
export default Video;