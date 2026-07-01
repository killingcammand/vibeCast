import axios from "axios";

export const commentApi = axios.create({
    baseURL: "http://localhost:8080/api/comments",
    // withCredentials: true
});

commentApi.interceptors.request.use((req)=>{
    const token=localStorage.getItem('accessToken');
    if(token){
        req.headers['Authorization']=`Bearer ${token}`;
    }
    return req;
});