import { 
    registerUserService,
    loginUserService,
    refreshTokenService,
    logoutUserService,
    meService
 } from "../services/auth.service.js";

export const registerUserController=async (req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const user=await registerUserService(name,email,password);
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user,
            // accessToken:user.tokens.accessToken
        });
    }catch(error){
        next(error);
    }
};
export const loginUserController=async (req,res,next)=>{
    try{
        console.log("BODY:", req.body);
        const {email,password}=req.body;
         console.log("2. Request body:", email);
        const {user,tokens}=await loginUserService(email,password);
            console.log("3. Service completed");

        console.log('User logged in:', user);
        console.log('tokens in:', tokens);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            user,
            accessToken:tokens.accessToken,
             
        });
    }catch(error){
        next(error);
    }
};
export const refreshTokenController=async (req,res,next)=>{
    try{
        const {refreshToken}=req.cookies.refreshToken ? {refreshToken:req.cookies.refreshToken} : req.body;
        const {user,tokens}=await refreshTokenService(refreshToken);
          res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({
            success:true,
            message:"Refresh token generated successfully",
            user,
            accessToken:tokens.accessToken
        
        });
    }catch(error){
        next(error);
    }
};
export const logoutUserController=async (req,res,next)=>{
    try{
        const userId=req.user.id;
        await logoutUserService(userId);
        res.clearCookie('refreshToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });
        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        });
    }catch(error){
        next(error);
    }
};
export const meController=async (req,res,next)=>{
    try{
        const userId=req.user.id;
        const user=await meService(userId);

        res.status(200).json({
            success:true,
            message:"User data retrieved successfully",
            user
        });
    }catch(error){
        next(error);
    }
};

