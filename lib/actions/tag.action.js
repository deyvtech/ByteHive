'use server'

import connectToDatabase from "@/config/database"
import Tag from "@/models/Tag.Model"

export async function getAllTags(page = 1, pageSize = 9) {
	try {
		connectToDatabase();

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
		]);

		return {
			metadata: {
				totalCount: tags[0].metadata[0].totalCount,
				page,
				pageSize,
			},
			data: JSON.parse(JSON.stringify(tags[0].data)),
		};
	} catch (error) {
		console.log(error);
	}
}



