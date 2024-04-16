import connectDB from '@/config/database'

export const GET = async (request) => {
    try {
        await connectDB()
    } catch (error) {
        
    }
}