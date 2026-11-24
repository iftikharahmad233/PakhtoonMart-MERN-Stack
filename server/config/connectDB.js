
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error(
        "Please provide MONGODB_URI in the .env file (or MONGO_URI for older setups)"
    );
}

async function connectDB() {
    try {
        await mongoose.connect(mongoUri);
        console.log("PakhtoonMart MongoDB Connected Successfully!");
    } catch (error) {
        console.log("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

export default connectDB;
 