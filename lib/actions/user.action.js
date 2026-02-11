'use server'
import User from "@/models/User.model";
import connectToDatabase from "@/config/database"

export async function getUserByEmail(authorEmail) {
    try {
        await connectToDatabase();
        const user = await User.findOne({ email: authorEmail });

        return user
    } catch (error) {
        console.log(error)
    }
}

export async function getAllUser() {
    try {
        await connectToDatabase()
        const users = await User.find({});

        return users || []
    } catch (error) {
       console.log(error) 
    }
}