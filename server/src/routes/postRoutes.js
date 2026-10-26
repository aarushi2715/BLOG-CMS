import express from 'express';
import {createPost} from '../controllers/postController.js';
import {getAllPosts} from '../controllers/postController.js';
import {getOnePost} from '../controllers/postController.js';
import { updatePost} from '../controllers/postController.js';
import {deletePost} from '../controllers/postController.js';
import { getAllPostsAdmin } from '../controllers/postController.js';
import { protect} from '../middleware/auth.js';



const router = express.Router();

router.post("/", protect, createPost);
//we dont need an id for accessign here because we are creating 
//only need that for update and delete
router.get("/", getAllPosts);
router.get("/:slug", getOnePost);
router.get("/admin/all",protect, getAllPostsAdmin);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);


export default router;
