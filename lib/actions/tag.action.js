'use server'

import connectToDatabase from "@/config/database"
import Tag from "@/models/Tag.Model"

export async function getAllTags() {
    try {
        connectToDatabase()
        const tags = await Tag.find({})
        return JSON.parse(JSON.stringify(tags))
    } catch (error) {
        console.log(error)
    }
}