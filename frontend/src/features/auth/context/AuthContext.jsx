import { createContext,useContext,useState,useEffect  } from "react";
import { api } from "../../../api/api.js";
import { setToken } from "../../../api/api.js";
import { loginUser,registerUser,logoutUser,getUser } from "../services/authService.js";
const AuthContext=createContext();

export const AuthProvider=({children})=>{
   const [accessToken,setAccessToken]=useState(null);
    //check for token in local storage on initial load
    useEffect(()=>{
        const token=localStorage.getItem('accessToken');
        if(token){
            setAccessToken(token);
            setToken(token);
        }
    },[]);
   //register function
    const register=async (name,email,password)=>{
        try {
            const res=await registerUser({name,email,password});
            
            return res.data;
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    }
   //login function
    const login=async (email,password)=>{
        try {
            const res=await loginUser({email,password});
            setAccessToken(res.data.accessToken);
            setToken(res.data.accessToken);
            localStorage.setItem('accessToken', res.data.accessToken);
            return res.data;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }
    //logout function
    const logout=async ()=>{
        try {
            const res=await logoutUser();
            setAccessToken(null);
            localStorage.removeItem('accessToken');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }
    const getMe=async ()=>{
        try {
            const res=await getUser();
            return res.data;
        } catch (error) {
            console.error('Get user failed:', error);
            throw error;
        }   
    }

    return (
        <AuthContext.Provider value={{accessToken,login,logout,register,setAccessToken,getMe}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth=()=>{
    return useContext(AuthContext);
};

