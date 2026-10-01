//starts the server
import app from './src/app.js';
dotenv.config();
import dotenv from 'dotenv';
import connectDB from "./src/config/db.js";



const PORT = process.env.PORT || 3000;
connectDB();
app.listen(PORT, ()=>console.log(`Server runs on port ${PORT}`));

