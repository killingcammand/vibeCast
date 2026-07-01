import { createContext,useContext,useState,useEffect  } from "react";
import { api } from "../../../api/auth.api.js";
import { setToken } from "../../../api/auth.api.js";
import { loginUser,registerUser,logoutUser,getUser } from "../services/auth.service.js";
const AuthContext=createContext();

export const AuthProvider=({children})=>{
   const [accessToken,setAccessToken]=useState(null);
   const [loading,setLoading]=useState(true);
    const [user,setUser]=useState(null);
    //check for token in local storage on initial load
   useEffect(() => {
  const initAuth = async () => {
    const token =
      localStorage.getItem("accessToken");

    if (token) {
      setAccessToken(token);
      setToken(token);

      try {
        const res = await getUser();

        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    }

    setLoading(false);
  };

  initAuth();
}, []);
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
            console.log("Attempting login ");

            const res=await loginUser({email,password});
            console.log("Login API response", res.data);
            setAccessToken(res.data.accessToken);
            setToken(res.data.accessToken);
            localStorage.setItem('accessToken', res.data.accessToken);
              // fetch current user
    const userRes = await getUser();
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
        <AuthContext.Provider value={{accessToken,login,logout,register,user,setUser,setAccessToken,getMe,loading,setLoading}}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth=()=>{
    return useContext(AuthContext);
};

