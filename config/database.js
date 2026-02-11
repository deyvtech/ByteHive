import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_DATABASE_NAME;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI");

  // If already have a connection, use it
  if (cached.conn) return cached.conn;

  // If don't have a connection promise yet, create one
  if (!cached.promise) {
    console.log("Creating new MongoDB connection promise...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: MONGODB_NAME,
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("MongoDB Connected Successfully");
      return mongoose;
    });
  }

  try {
    // Wait for the promise (whether it was just created or already existed)
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset if it fails so can try again
    throw e;
  }

  return cached.conn;
};

export default connectToDatabase;