import mongoose from "mongoose";
const connectDB = async()=>{
    console.log("connection function called ");
   try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected");
   }catch(error){
     console.error("Mongodb connection failed", error.message);
     process.exit(1);//app cant run without connecting to the db 

   }
};
export default connectDB;