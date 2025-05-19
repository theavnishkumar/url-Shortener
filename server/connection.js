import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
    try {
        // eslint-disable-next-line no-undef
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
}