import express from 'express';
import { protect } from "../middleware/auth.js";
import {login} from '../controllers/authController.js';

const router = express.Router();


router.post("/login", login);

//testing the middleware
router.get("/test", protect, (req, res)=>{
    res.status(200).json({
        message: "Middleware working",
        user: req.user,
    });
});

export default router;


