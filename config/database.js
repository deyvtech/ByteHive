import mongoose from "mongoose";

let isConnected = false;
const MONGODB_NAME = process.env.MONGODB_DATABASE_NAME

const  connectToDatabase = async () => {
	// Prevent unknown queries
	mongoose.set("strictQuery", true);

	// Check if there's MongoDB URI
	if (!process.env.MONGODB_URI) console.log("Missing MongoDB URL");

	if (isConnected) {
		console.log("MongoDB is already connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: MONGODB_NAME,
		});
		isConnected = true;
		console.log("MongoDB is Connected");
	} catch (error) {
		console.log(error);
	}
};

export default connectToDatabase
