'use server'
import User from "@/models/User.model";
import connectToDatabase from "@/config/database"

export async function getUserByEmail(authorEmail) {
    try {
        connectToDatabase();
        const user = await User.findOne({ email: authorEmail });

        return user
    } catch (error) {
        console.log(error)
    }
}