import axios from "axios";

export const videoApi = axios.create({
    baseURL: "http://localhost:8080/api/videos",
    // withCredentials: true
});

videoApi.interceptors.request.use((req)=>{
    const token=localStorage.getItem('accessToken');
    if(token){
        req.headers['Authorization']=`Bearer ${token}`;
    }
    return req;
});

