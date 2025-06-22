import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user-model.js';


const authorize = async(req,res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Access denied, Please login to continue'
            });
        }
        const decodeToken = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decodeToken.userId);
        if(!user){
            return res.status(401).json({
            success: false,
            message: 'User not found'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: 'User is Unothorized'
        })
    }
}

export default authorize;