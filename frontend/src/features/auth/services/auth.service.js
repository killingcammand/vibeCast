import { api } from "../../../api/auth.api";

export const registerUser=async ({name,email,password})=>{
    return await api.post('/register',{name,email,password});
}
export const loginUser=async ({email,password})=>{
    return await api.post('/login',{email,password});
}
export const logoutUser=async ()=>{
    return await api.post('/logout');
}
export const getUser=async ()=>{
    return await api.get('/me');
}
