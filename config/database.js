import mongoose from "mongoose";

let isConnected = false;

const  connectToDatabase = async () => {
	// Prevent unknown queries
	mongoose.set("strictQuery", true);

	// Check if there's MongoDB URI
	if (!process.env.MONGODB_URI) console.log("Missing MongoDB URL");

	if (isConnected) {
		console.log("MongoDB is already conneted");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "bytehive",
		});
		isConnected = true;
		console.log("MongoDB is Connected");
	} catch (error) {
		console.log(error);
	}
};

export default connectToDatabase
