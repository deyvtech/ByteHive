"use server";

import connectToDatabase from "@/config/database";
import Question from "@/models/Question.model";
import Tag from "@/models/Tag.Model";


export async function getAllQuestion() {
		await connectToDatabase();
    try {
        const questions = await Question.find().populate({ path: 'tags', model: Tag });
        const count = await Question.countDocuments()
        return  {questions , count};
    } catch (error) {
		console.log(error);
    }
}

export async function addQuestion(params) {
	try {
		await connectToDatabase();

		const { title, content, tags } = params;

		const question = await Question.create({
			title,
			content,
		});

		const tagDocuments = [];
		for (const tag of tags) {
			const existingTag = await Tag.findOne({
				"name": {$regex: tag},
			});

			if (existingTag) {
				await Tag.updateOne(
					{ _id: existingTag._id },
					{ $addToSet: { questions: question._id } }
				);
				tagDocuments.push(existingTag._id);
			} else {
				const newTag = await Tag.create({
					name: tag,
					questions: [question._id],
				});
				tagDocuments.push(newTag._id);
			}
		}

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		});
	} catch (error) {
		console.log(error);
	}
}
