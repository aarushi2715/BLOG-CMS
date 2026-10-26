import Post from '../models/Post.js';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import {generateSlug} from '../utils/generateSlug.js';

export const createPost = async(req, res)=>{
    try{

        const {title, excerpt, content, category, status } = req.body;
               
        
        if(title && !title.trim()){
            return res.status(400).json({
                message: "title cannot be empty"
            });   
        }

         if(content && !content.trim()){         //!content?.trim()
            return res.status(400).json({
                message: "content cannot be empty"
            });
        }

        const existingCategory =  await Category.findById(category);

        if(!existingCategory){
            return res.status(400).json({
                message: "cateogry not found"
            });
        }
        
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
         
        
         if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid category ID"
            });
        }

        // Duplicate title/slug from unique schema index
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Post with this title or slug already exists"
            });
        }

        // Mongoose schema validation
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }

        res.status(500).json({
            message: error.message,
        });

    }
};

export const getAllPosts  = async(req, res)=>{
    try{
       // Values coming from ?page=1&limit=6&category=...
        const {
            page = 1,
            limit = 6,
            category,
        } = req.query;
        // Query parameters are strings, so convert them to numbers
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        // Public users should only see published posts
       
        const filter = {
            status: "published"
        };
        //ig category is provided add it to filter object
        if(category){
            filter.category = category;
        }
        //calculate how many posts to skip for each page 
        const skip = (pageNumber-1)*limitNumber;

        //get posts
        const posts = await Post.find(filter)
           .sort({createdAt: -1})
           .skip(skip)
           .limit(limitNumber);

           //count all posts matching the filter
           const totalPosts = await Post.countDocuments(filter);

           //calculate total number of pages 
           const totalPages = Math.ceil(totalPosts/limitNumber);
 
        res.status(200).json({
            posts,
            currentPage: pageNumber,
            totalPages,
            totalPosts
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
            //is someone knows the slug of a draft they should still get 404
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

        if(Object.keys(req.body).length === 0){
            return res.status(400).json({
                message: "no fields provided for update"
            });
        }

        if(title!==undefined &&  !title.trim()){
            return res.status(400).json({
                message: "title cannot be empty. provided with whitespace "
            });
        }

        if( content !== undefined  && !content.trim()){
            return res.status(400).json({
                message: "content cannot be empty. provided with whitespace"
            });
        }

        
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            message: "invalid post id"
        })
       }

        const existingPost = await Post.findById(id);
        if (!existingPost){
            return res.status(404).json({
                message: "post not found"
            });
        }

        //validate category only when it is given
        if(category != undefined ){
            if(!mongoose.Types.ObjectId.isValid(category)){
                return res.status(400).json({
                    message: "invalid category id "
                });
            }

            const existingCategory =  await Category.findById(category);
            if(!existingCategory){
                return res.status(404).json({
                    message: "cateogry not found"
                });
            }
        }

      

        const updatedData = {};
                    if (content !== undefined) {
                updatedData.content = content;
            }

            if (category !== undefined) {
                updatedData.category = category;
            }

            if (status !== undefined) {
                updatedData.status = status;
            }
            if (excerpt !== undefined) {
                 updatedData.excerpt = excerpt;
            }

           
            //if title is given in the body and it is truthy means it is not undefined or null 
            if(title!==undefined){
                updatedData.title = title;
                updatedData.slug = generateSlug(title);
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
        if(error.name == "CastError"){
            return res.status(400).json({
                message: "invalid post id"
            });
        }
         // Duplicate unique title/slug
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Post with this title or slug already exists"
            });
        }

        // Schema validation errors
        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: error.message
            });
        }
        res.status(500).json({
            message: error.message,
        })

    }
}

export const getAllPostsAdmin = async (req, res) => {
    try {
        const posts = await Post.find({});

        res.status(200).json({
            posts
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const deletePost = async(req, res)=>{
    try{
        const {id} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid post ID"
            });
        }

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
