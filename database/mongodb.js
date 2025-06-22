import mongoose from "mongoose";
import { DB_URI } from "../config/env.js";

if(!DB_URI){
    throw new Error('MongoDB URI Missing');
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log('Connected to the Database successfully')
    } catch (error) {
        console.log('MongoDB connection failed', error);
        process.exit(1);
    }
};

export default connectToDB;