import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token)
        {
            return res.statud(401).json({error:"Unauthorized user"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded)
        {
            return res.status(401).json({error:"unauthorized user"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user)
        {
            return res.status(401).json({error:"User not found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("error in protectRoute middleware",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export default protectRoute;