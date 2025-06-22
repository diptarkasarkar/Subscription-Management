import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User email is required'],
        unique: true,
        trim: true,
        lowercase: true,
       // match: [/\S+@\S+\.\S+, 'Please fill a valid email']
    },
    password: {
        type: String,
        required: [true, 'User password is required'],
        minLength: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User'],
        default: 'User'
    }

},{timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;