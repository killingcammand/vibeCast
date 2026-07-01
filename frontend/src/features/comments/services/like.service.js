import { likeApi } from "../../../api/like.api.js";

export const toggleLike=async (data)=>{
    return await likeApi.post('/toggle',data);
};
export const getLikes=async (videoId)=>{
    return await likeApi.get(`/count`,{
        params:{targetId,targetType}
    });
};
