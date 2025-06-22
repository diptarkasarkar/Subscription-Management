import mongoose from "mongoose"
import User from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

export const signUp = async(req,res,next) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      //Creating a new user
      const { name, email, password, role } = req.body;
      const checkExistingUser = await User.findOne({email});
      if(checkExistingUser){
        res.status(409).json({
            success: false,
            message: 'User already exists'
        });
      };

      //Hash Password
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(password, salt);

      const newUsers = await User.create([{ name, email, role, password: hasedPassword }], {session});
      const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

      await session.commitTransaction();
      session.endSession();
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: {
            token,
            user: newUsers[0]
        }
      });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async(req,res,next) =>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        } else{
            const passwordCheck = await bcrypt.compare(password, user.password);
            if(!passwordCheck){
                res.status(401).json({
                    success: false,
                    message: 'Invalid password'
                })
            } else{
                const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
                res.status(200).json({
                    success: true,
                    message: "SignIn successfull",
                    data: {
                        token,
                        user,
                    }
                });
            };
        };
    } catch (error) {
        next(error);
    }
};

// export const signOut = async(req,res,next) =>{

// }