//starts the server
import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('Server runs on port ${PORT}'));
