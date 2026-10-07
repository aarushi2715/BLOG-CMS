import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Post from "./models/Post.js";

const testModel = async()=>{
    try{

        await connectDB();
        const user  = await User.create({
            name: "sdnsmda",
            email: "test2@gmail.com",
            password: "dfjidnrf",
            role: 'admin',
        });

        console.log("user created", user);

            // 2. Create a Category
          const category = await Category.create({
              name: "Technology1",
              slug: "technology1",

           });

            console.log("Category created:", category);


            // 3. Create a Post
            const post = await Post.create({
            title: "My First Post",
            slug: "my-first-post1",
            excerpt: "sdjfidsfeklsfnesklfniojfcodesojdfeospjdfwpdpnxclkdsjfojfopeke[",
            content: "This is a test post.",
            category: category._id,
            status: "draft",
            publishedAt: "2026.01.01",
          
            });

            console.log("Post created:", post);

 


    }catch(error){
        console.error("Error: ", error);
    }
};

testModel();