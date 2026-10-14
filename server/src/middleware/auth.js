console.log("AUTH.JS FILE LOADED");
import jwt from 'jsonwebtoken';

export const protect = (req, res, next)=>{
  console.log('protect functin s at least working ');
   

  const authHeader = req.headers.authorization;
  console.log(authHeader);


  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({
      message: "Not authorized , you have no token",
    });
  }
  
  const token = authHeader.split(" ")[1];



  try{
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // { id: "123", role: "author" }
    //a property that i create

    next();
  }catch(error){
     console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      message: "Not authorised , token is invalid",
    });
  }



};