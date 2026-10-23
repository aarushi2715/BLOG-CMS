import express from 'express';
import {createPost} from '../controllers/postController.js';
import { protect} from '../middleware/auth.js';



const router = express.Router();

router.post("/", protect, createPost);
//we dont need an id for accessign here because we are creating 
//only need that for update and delete

export default router;
