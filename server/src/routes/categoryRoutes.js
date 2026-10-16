import express from 'express';
import {protect} from '../middleware/auth.js';
import {createCategory} from '../controllers/categoryController.js';
import {getAllCategory} from '../controllers/categoryController.js';
import {getOneCategory} from '../controllers/categoryController.js';
import {updateCategory} from '../controllers/categoryController.js';
import {deleteCategory} from '../controllers/categoryController.js';
const router = express.Router();

router.post("/", protect, createCategory);
router.get("/", getAllCategory);
router.get("/:name", getOneCategory);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

export default router;
