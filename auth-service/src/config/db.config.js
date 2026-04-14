import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        console.log('process.env.MONGO_URI:', process.env.MONGO_URI,{
            // family: 4, // Use IPv4
        });
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    }   catch(error){
        console.error('MongoDB connection failed:',error.message);
        process.exit(1);
    }
};
export default connectDB;