import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
  },
  {timestamps: true},
);

export default mongoose.model('Category', categorySchema);

