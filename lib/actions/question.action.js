"use server";
import connectToDatabase from "@/config/database";
import Question from "@/models/Question.model";
import Tag from "@/models/Tag.Model";
import { revalidatePath } from "next/cache";
import { getUserByEmail } from "./user.action";
import User from "@/models/User.model";
import Answer from "@/models/Answer.model";
import Questions from "@/components/Question";

export async function getQuestionByUser(authorEmail) {
	try {
		connectToDatabase()

		const user = await User.findOne({email: authorEmail})

		const userQuestions = await Question.find({ author: user._id }).populate({
			path: "tags",
			model: Tag,
		})
		

		return JSON.parse(JSON.stringify(userQuestions))
	} catch (error) {
		console.log(error)
	}
}

export async function getAllQuestion() {
	try {
		connectToDatabase();

		const questions = await Question.find().populate({
			path: "tags",
			model: Tag,
		});
		const count = await Question.countDocuments();


		return { questions: JSON.parse(JSON.stringify(questions)), count };
	} catch (error) {
		console.log(error);
	}
}

export async function getQuestionById(params) {
	try {
		connectToDatabase();
		const question = await Question.findById(params)
			.populate({ path: 'tags', model: Tag })
			.populate({path: 'author', ref: User})
			.populate({
				path: 'answers', 
				model: Answer, 
				populate: {
					path: 'author', 
					model: User 
				}
			});
		return JSON.parse(JSON.stringify(question))
	} catch (error) {}
}

export async function addQuestion(params) {
	try {
		connectToDatabase();

		const { title, content, tags, authorEmail, path } = params;

		// get user id
		// const user = await User.findOne({ email: authorEmail });
		const user = await getUserByEmail(authorEmail)


		const author = user._id

		// add question
		const question = await Question.create({
			title,
			content,
			author,
		});

		// update the user questions
		await User.findByIdAndUpdate({_id: author}, { $push: { questions: question._id } })

		// loop all tags in push
		const tagDocuments = [];
		for (const tag of tags) {
			const existingTag = await Tag.findOne({
				name: { $regex: tag },
			});

			if (existingTag) {
				await Tag.updateOne(
					{ _id: existingTag._id },
					{ $addToSet: { questions: question._id } }
				);
				tagDocuments.push(existingTag._id);
			} else {
				const newTag = await Tag.create({
					name: tag.toLowerCase(),
					questions: [question._id],
				});
				tagDocuments.push(newTag._id);
			}
		}

		// update Question with the array tagsIDs

		await Question.findByIdAndUpdate(question._id, {
			$push: { tags: { $each: tagDocuments } },
		});

		// revalidate path to see the updated data
		revalidatePath(path)
	} catch (error) {
		console.log(error);
	}
}
