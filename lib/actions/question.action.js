"use server";
import connectToDatabase from "@/config/database";
import Question from "@/models/Question.model";
import Tag from "@/models/Tag.Model";
import { revalidatePath } from "next/cache";
import { getUserByEmail } from "./user.action";
import User from "@/models/User.model";
import Answer from "@/models/Answer.model";

const PAGE_SIZE = 5;

export async function getQuestionByUser(
	authorEmail,
	page = 1,
	pageSize = PAGE_SIZE
) {
	try {
		await connectToDatabase();

		const user = await User.findOne({ email: authorEmail });

		const userQuestions = await Question.aggregate([
			{ $match: { author: user._id } },
			{
				$sort: {
					createdAt: -1,
					_id: -1,
				},
			},
			{
				$facet: {
					metadata: [{ $count: "totalCount" }],
					data: [
						{ $skip: (page - 1) * pageSize },
						{ $limit: pageSize },
						{
							$lookup: {
								from: "tags",
								localField: "tags",
								foreignField: "_id",
								as: "populatedTags",
							},
						},
					],
				},
			},
		]);

		return {
			metadata: {
				totalCount: userQuestions[0].metadata[0].totalCount,
				page,
				pageSize,
			},
			data: JSON.parse(JSON.stringify(userQuestions[0].data)),
		};
	} catch (error) {
		console.log(error);
	}
}

export async function getAllQuestion(page = 1, pageSize = PAGE_SIZE, userEmail, sort = 'newest', search) {
	try {
		await connectToDatabase();

		let user = ''

		if (userEmail) { 
			user = await User.findOne({ email: userEmail })
			
		}

		let sorting = {}
		switch (sort) {
			case 'newest':
				sorting = {
					createdAt: -1,
					_id: -1,
				}
				break;
			case 'frequent':
				sorting = { views: -1 }
				break;
			case 'unanswered':
				sorting = { answers: -1 }
		}

		let questions;
		if (!search) {
			questions = await Question.aggregate([
				{
					$sort: sorting,
				},
				{
					$facet: {
						metadata: [{ $count: "totalCount" }],
						data: [
							{ $skip: (page - 1) * pageSize },
							{ $limit: pageSize },
							{
								$lookup: {
									from: "tags",
									localField: "tags",
									foreignField: "_id",
									as: "populatedTags",
								},
							},
						],
					},
				},
			]);
		} else {
			questions = await Question.aggregate([
				{
					$match: {
					  $or: [
						{ title: { $regex: search, $options: 'i' } },
						{ content: { $regex: search, $options: 'i' } },
					  ],
					},
				  },
				{
					$sort: sorting,
				},
				{
					$facet: {
						metadata: [{ $count: "totalCount" }],
						data: [
							{ $skip: (page - 1) * pageSize },
							{ $limit: pageSize },
							{
								$lookup: {
									from: "tags",
									localField: "tags",
									foreignField: "_id",
									as: "populatedTags",
								},
							},
						],
					},
				},
			]);
		}


		if (!questions) {

			return {
				metadata: {
					totalCount: questions[0].metadata[0].totalCount,
					page,
					pageSize,
				},
				data: [],
				userId: JSON.parse(JSON.stringify(user._id))
			}
		} else {
			return {
				metadata: {
					totalCount: questions[0].metadata[0].totalCount,
					page,
					pageSize,
				},
				data: JSON.parse(JSON.stringify(questions[0].data)) || [],
				userId: user._id ? JSON.parse(JSON.stringify(user._id)) : ''
			}
		}
		
		
	} catch (error) {
		console.log(error);
		return {data: [], userId: ''}
	}
}

export async function getQuestionById(params) {
	try {
		await connectToDatabase();
		// implement view Cout
		await Question.findOneAndUpdate({_id: params}, {$inc: {views: 1}})


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
		
	} catch (error) {
		console.log(error)
	}
}

export async function addQuestion(params) {
	try {
		await connectToDatabase();

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



export async function likeQuestion(params, likeState) {
	try {
		await connectToDatabase();


		const user = await User.findOne({email: params.userEmail})

		// Like
		if (!likeState) {
			await Question.findByIdAndUpdate(
				{ _id: params.questionId, upVotes: { $ne: user._id } },
				{ $addToSet: { upVotes: user._id } },
				{ returnNewDocument: true }
			);
		console.log('like')

		} else {
			// DisLike
			await Question.findByIdAndUpdate(
				{ _id: params.questionId, upVotes: { $ne: user._id } },
				{ $pull: { upVotes: user._id } },
				{ new: true }
			);

		console.log('unlike')

		}

		revalidatePath("/");
	} catch (error) {
		console.log(error);
	}
}




export async function getTopQuestions() {
try {
	await connectToDatabase()
	const question = await Question.find().sort({ "answers": -1 }).limit(5)
	
	return JSON.parse(JSON.stringify(question)) || []
} catch (error) {
	console.log(error)
	return []
}
}