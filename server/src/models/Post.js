import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String, 
            required: true, 
            trim: true, //remove trailing and beginning white space
        },
        slug:{
            type: String, 
            required: true, 
            unique: true, // used in /articles/:slug route
            lowercase: true, 
        },
        excerpt:{
            type: String, 
            required: true, 
            maxlength: 300,
        },
        content:{
            type: String, 
            required: true, 
        }, 
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            // reference, not a copied string — rename a category once, every post reflects it
            required: true,
        },
        status:{
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        publishedAt:{
            type: Date,
            default: null,
        }
    },
    {timestamps: true},
)

export default mongoose.model('Post', postSchema);