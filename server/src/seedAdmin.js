import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import bcrypt from "bcryptjs";
import mongoose from"mongoose";


import connectDB from './config/db.js';
import User from "./models/User.js";

const seedAdmin = async()=>{
    try{
        await connectDB();


        const name = 'Aarushi';
        const email = 'aarushisinghnaruka@gmail.com';
        const password = 'aarushi123';


        const existingAdmin = await User.findOne({email});

        if(existingAdmin){
            console.log("Admin already exists ");
            return;

        }
        //10 is for difficulty level , so that bcrypt will hash the passwrod more 
        const hashPwd = await bcrypt.hash(password, 10);

        const admin = await User.create({
            name, 
            email,
            password: hashPwd,
            role: 'admin',

        });

        console.log("Admin created");
        console.log("Email: ", admin.email);

    }catch(error){
        console.error("error creating admin", error);

    }finally{
        await mongoose.connection.close();
    }
};

seedAdmin();