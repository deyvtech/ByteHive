"use server";

import connectToDatabase from "@/config/database";
import Answer from "@/models/Answer.model";
import Question from "@/models/Question.model";
import User from "@/models/User.model";
import { revalidatePath } from "next/cache";

export async function addAnswer(params) {
	try {
		await connectToDatabase();

		const { questionId, authorEmail, content, path } = params;
		
		const user = await User.findOne({ email: authorEmail })
		
		const answer = await Answer.create({
			content,
			author: user._id,
			question: questionId,
		});

		await Question.findOneAndUpdate(
			{ _id: questionId },
			{ $push: { answers: answer._id } }
		);

		revalidatePath(questionId);
	} catch (error) {
		console.error(error);
	}
}

export async function getAnswerByQuestion(params, page = 1, pageSize = 2) {
	try {

		console.log(params)
		await connectToDatabase()

		const question = await Question.findById(params)

		const questionAnswers = await Answer.aggregate([
			{ $match: { question: question._id } },
			{
				$facet: {
					metadata: [{ $count: "totalCount" }],
					data: [
						{ $skip: (page - 1) * pageSize },
						{ $limit: pageSize },
						{
							$lookup: {
								from: "users",
								localField: "author",
								foreignField: "_id",
								as: "author",
								pipeline: [
									{ "$project": { "password": 0, "questions": 0, "saved": 0, }}
								]
							},
						},
					],
				},
			},
		]);
		



		return {
			metadata: {
				totalCount: questionAnswers[0].metadata[0].totalCount,
				page,
				pageSize,
			},
			data: JSON.parse(JSON.stringify(questionAnswers[0].data)),
		};

	} catch (error) {
		console.log(error)
	}
}