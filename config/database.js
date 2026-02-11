import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_DATABASE_NAME;

const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    if (!MONGODB_URI) {
        console.error("Missing MONGODB_URI in environment variables");
        return;
    }

    // 1. Check current connection state
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const state = mongoose.connection.readyState;

    if (state === 1) {
        console.log("MongoDB is already connected");
        return;
    }

    if (state === 2) {
        console.log("MongoDB is currently connecting...");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGODB_NAME,
            // 2. CRITICAL: Disable buffering so it fails fast 
            // instead of hanging for 10 seconds.
            bufferCommands: false, 
        });
        
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error; 
    }
};

export default connectToDatabase;