import axios from "axios";

export const likeApi = axios.create({
    baseURL: "http://localhost:8080/api/likes",
    // withCredentials: true
});

likeApi.interceptors.request.use((req)=>{
    const token=localStorage.getItem('accessToken');
    if(token){
        req.headers['Authorization']=`Bearer ${token}`;
    }
    return req;
});