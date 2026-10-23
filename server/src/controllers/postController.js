import Post from '../models/Post.js';
import {generateSlug} from '../utils/generateSlug.js';

export const createPost = async(req, res)=>{
    try{

        const {title, excerpt, content, category, status } = req.body;
        const slug = generateSlug(title);

        const post = await Post.create({
            title,
            slug,
            excerpt, 
            content, 
            category,
            author: req.user.id,
            status: status || "draft",
            publishedAt: status === "published" ? new Date() : null,
            //built in js constructor which creates a new date object
            
        });
        res.status(201).json({
            post,
        })

    }catch(error){
        res.status(400).json({
            message: error.message,
        });

    }
};
