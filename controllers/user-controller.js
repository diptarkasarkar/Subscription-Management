import User from "../models/user-model.js";
import bcrypt from "bcryptjs";

export const getUsers = async(req,res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error)
    }
}

export const getUser = async(req,res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user){
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else{
            res.status(200).json({
                success: true,
                data: user
            });
        }
        
    } catch (error) {
        next(error)
    }
}

export const updateUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else{
            const updates = req.body;
            const userId = req.params.id;
            if(updates.password){
                const salt = await bcrypt.genSalt(10);
                updates.password = await bcrypt.hash(updates.password, salt);
            }
            const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
            res.status(200).json({
                success: true,
                message: 'User details updated successfully',
                data: updatedUser
            })
        }
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async(req,res,next) =>{
    try {
        const userId = req.params.id;
        const findUser = await User.findById(userId);
        if(!findUser){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } else{
            const deletedUser = await User.findByIdAndDelete(userId);
            res.status(200).json({
                success: true,
                message: 'User Deleted successfully',
                data: {
                    username: deletedUser.username,
                    email: deletedUser.email,
                },
            });
        };
    } catch (error) {
        console.log("User deletation failed");
        next(error);
    }
}