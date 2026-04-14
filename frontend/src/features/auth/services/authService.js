import { api } from "../../../api/api";

export const registerUser=async ({name,email,password})=>{
    return await api.post('/auth/register',{name,email,password});
}
export const loginUser=async ({email,password})=>{
    return await api.post('/auth/login',{email,password});
}
export const logoutUser=async ()=>{
    return await api.post('/auth/logout');
}
export const getUser=async ()=>{
    return await api.get('/auth/me');
}
