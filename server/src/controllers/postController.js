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

export const getAllPosts  = async(req, res)=>{
    try{
        const posts  = await Post.find({
            status: "published",
        });

        res.status(200).json({
            posts
        });

    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
}
export const getOnePost = async(req, res)=>{
    try{
        const {slug} = req.params;

        const post  = await Post.findOne({ 
            slug,
            status:"published",
        });
        if(!post){
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json({post});

    }catch(error){
        res.status(500).json({
            message: error.message
        });

    }
}

export const updatePost = async (req, res)=>{
    try{

        const{ id } =  req.params;
        const { title, excerpt, content, category, status } = req.body;

        const updatedData = {
            excerpt, content, category, status
        };
        //of title is given in the body and it is truthy means it is not undefined or null 
        if(title){
            updatedData.title = title;
            updatedData.slug = generateSlug(title);
        }

        const existingPost = await Post.findById(id);
        if (!existingPost){
            return res.status(404).json({
                message: " post not found"
            });
        }
        //if it is becoming published and before it was not 
        if(status == "published" && existingPost.status!== "published"){
            updatedData.publishedAt = new Date();
        }

        const post = await Post.findByIdAndUpdate(
            id, 
            updatedData,
            {
                 returnDocument: "after",//update dic return
                 runValidators: true,
                 //apply your schema validation during the update 
            }
        );

        res.status(200).json({post});




    }catch(error){
        res.status(500).json({
            message: error.message,
        })

    }
}

export const deletePost = async(req, res)=>{
    try{
        const {id} = req.params;
        const deleted = await Post.findByIdAndDelete(id);
        if(!deleted){
            res.status(404).json({
                message: "post not found"
            });
        }

        res.status(200).json({
            message: "post deleted"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
        

}
