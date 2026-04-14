import User from '../models/user.model.js';
import bycrypt from 'bcrypt';
import { generateToken } from '../utils/token.utils.js';
import jwt from "jsonwebtoken";

export const registerUserService=async (name,email,password)=>{
    const existingUser=await User.findOne({email});
    if(existingUser){
        throw new Error('User already exists');
    }
    const hashedPassword=await bycrypt.hash(password,10);//hash the password**
    if(!hashedPassword){
        throw new Error('Error hashing password');
    }
    const newUser=await User.create({
        name,
        email,
        password:hashedPassword
    });
    // console.log('New user created:', newUser);
    const tokens=generateToken(newUser);
    return {user:newUser,tokens};
};

export const loginUserService=async (email,password)=>{
    const existingUser=await User.findOne({email});
    if(!existingUser){
        throw new Error('Invalid email or password');
    }
    const isPasswordValid=await bycrypt.compare(password,existingUser.password);
    if(!isPasswordValid){
        throw new Error('Invalid email or password');
    }
    const {accessToken,refreshToken}=generateToken(existingUser);
    return {user:existingUser,tokens:{accessToken,refreshToken}};
};

export const refreshTokenService=async (refreshToken)=>{
    if(!refreshToken){
        throw new Error('Refresh token is required');
    }
    const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
    const existingUser=await User.findById(decoded.id);
    if(!existingUser){
        throw new Error('User not found');
    }
    const tokens=generateToken(existingUser);
    existingUser.refreshToken=tokens.refreshToken;
    await existingUser.save();
    return {user:existingUser,tokens};
};
export const logoutUserService=async (userId)=>{
    const existingUser=await User.findById(userId);
    if(!existingUser){
        throw new Error('User not found');
    }
    existingUser.refreshToken=null;
    await existingUser.save();
    return {message:'Logged out successfully'};
};
export const meService=async (userId)=>{
    const existingUser=await User.findById(userId);
    if(!existingUser){
        throw new Error('User not found');
    }
    return {user:existingUser};
};
