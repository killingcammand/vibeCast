import { videoApi } from "../../../api/video.api";

export const uploadVideo=async (data)=>{
    return await videoApi.post('/upload',data);
};

export const getVideos=async (page=1,limit=10)=>{
    return await videoApi.get(`/?page=${page}&limit=${limit}`);
}

export const getVideoById=async (id)=>{
    return await videoApi.get(`/${id}`);
}

export const deleteVideo=async (id)=>{
    return await videoApi.delete(`/${id}`);
}

