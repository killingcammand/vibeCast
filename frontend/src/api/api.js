import axios from 'axios';

let accessToken = null;
export const setToken=(token)=>{
    accessToken=token;
};
export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true, // Include cookies in requests
});
export const refreshApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});
//request interceptor to add access token to headers
api.interceptors.request.use(
    config=>{
        if(accessToken){
            config.headers['Authorization']=`Bearer ${accessToken}`;
        }
        return config;
    },
    error=>Promise.reject(error)
);
api.interceptors.response.use(
    res=>res,
    async error=>{
        const originalRequest=error.config;
        if(error.response.status===401 && !originalRequest._retry){
            originalRequest._retry=true;
            try{
                const res=await refreshApi.post('/auth/refresh');
                const newAccessToken=res.data.accessToken;
                setToken(newAccessToken);
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers['Authorization']=`Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch(err){
                console.error('Token refresh failed:', err);
                //logout scenario can be handled here, like clearing tokens and redirecting to login
                setToken(null);
                localStorage.removeItem('accessToken');
                window.location.href='/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);