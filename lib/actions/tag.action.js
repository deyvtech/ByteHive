'use server'

import connectToDatabase from "@/config/database"
import Tag from "@/models/Tag.Model"

export async function getAllTags(page = 1, pageSize = 9) {
	try {
		await connectToDatabase();

		const tags = await Tag.aggregate([
			{
				$facet: {
					metadata: [{ $count: "totalCount" }],
					data: [
						{ $skip: (page - 1) * pageSize },
						{ $limit: pageSize },
					],
				},
			},
		])

		return {
			metadata: {
				totalCount: tags[0].metadata[0].totalCount,
				page,
				pageSize,
			},
			data: JSON.parse(JSON.stringify(tags[0].data)) || [],
		};
	} catch (error) {
		console.log(error);
		return { data: [] };
	}
}





export async function getTopTags() {

	try {
		await connectToDatabase()

		const tags = await Tag.find().sort({ "questions": -1 }).limit(5)
		return JSON.parse(JSON.stringify(tags))
	} catch (error) {
		
	}
	
}