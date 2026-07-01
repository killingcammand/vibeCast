import { commentApi } from "../../../api/comment.api.js";

export const createComment=async (data)=>{
    return await commentApi.post('/',data);
};
export const getComments=async (videoID)=>{
    return await commentApi.get(`/${videoID}`);
};
