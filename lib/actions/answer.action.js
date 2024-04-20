"use server";

import connectToDatabase from "@/config/database";
import Answer from "@/models/Answer.model";
import Question from "@/models/Question.model";
import User from "@/models/User.model";
import { revalidatePath } from "next/cache";

export async function addAnswer(params) {
	try {
		connectToDatabase();

        const { questionId, authorEmail, content, path } = params;
        const user = await User.findOne({ email: authorEmail })
        console.log(user)
		const answer = await Answer.create({
			content,
			author: user._id,
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
