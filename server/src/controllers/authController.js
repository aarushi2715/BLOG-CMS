import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const login = async(req, res) =>{
    try{

        const {email, password} = req.body;

        const user  = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordCheck = await bcrypt.compare(
            password, 
            user.password
        );

        if(!passwordCheck){
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

      // creating a jwt token jwt.sign(payload, secret, options);

      const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token
      })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }


};

export {login};
