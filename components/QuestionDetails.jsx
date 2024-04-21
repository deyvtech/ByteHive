"use client";
import {
	Divider,
	Link,
	Chip,
	Card,
	CardBody,
	Avatar,
	CardFooter,
	AvatarGroup,
	User,
	Pagination,
	Skeleton,
} from "@nextui-org/react";
import QuestionContentDetails from "./QuestionContentDetails";
import Time from "./Time";
import FormAnswer from "./FormAnswer";
import HtmlParse from "./HtmlParse";
import React, { useState } from "react";
import { getAnswerByQuestion } from "@/lib/actions/answer.action";

const QuestionDetails = ({ result, answers, params }) => {
	const [dataAnswer, setDataAnswers] = useState(answers);
	const [loading, setLoading] = useState(false);

	const handlechange = async (e) => {
		try {
			setLoading(true);
			const data = await getAnswerByQuestion(params, e);
			setDataAnswers(data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="pb-10">
			<h1 className="text-2xl">{result.title}</h1>
			<Divider className="mt-5" />
			<QuestionContentDetails
				content={result.content}
				tags={result.tags}
			/>
			<ul className="flex gap-3 mt-10">
				{result.tags.map((tag) => (
					<li key={tag._id}>
						<Link href={`/tags/${tag._id}`}>
							<Chip
								size="sm"
								className="rounded-sm text-primaryTheme-700 font-light"
							>
								{tag.name}
							</Chip>
						</Link>
					</li>
				))}
			</ul>
			<div className="flex flex-col items-end justify-end mt-3">
				<div className="flex justify-center items-center gap-2 mt-2">
					<User
						name={result.author?.name}
						description={
							<Time
								time={new Date(result.createdAt)}
								text={"Asked"}
							/>
						}
						avatarProps={{
							src: `${result.author?.profile_url}`,
						}}
					/>
				</div>
			</div>
			<Divider className="mt-5" />
			{!loading ? (
				dataAnswer?.data.map((answer) => (
					<React.Fragment key={answer._id}>
						<Card className="rounded-sm my-5">
							<CardBody className="rounded-sm">
								<HtmlParse content={answer.content} />
							</CardBody>
							<CardFooter className="mt-2 flex-col items-end justify-end">
								<User
									name={answer.author[0]?.name}
									description={
										<Time
											time={new Date(answer.createdAt)}
											text={"Answered"}
										/>
									}
									avatarProps={{
										src: `${answer.author[0]?.profile_url}`,
									}}
								/>
							</CardFooter>
						</Card>
					</React.Fragment>
				))
			) : (
				<Skeleton className="rounded-lg my-10">
					<div className="h-24 rounded-lg bg-default-300"></div>
				</Skeleton>
			)}

			<AvatarGroup
				isBordered
				max={5}
				total={result.answers.length}
				className="ml-auto justify-end"
			>
				{result.answers.map((answer) => (
					<React.Fragment key={answer._id}>
						<Avatar
							size="sm"
							showFallback
							name={answer.author?.name}
							src={answer.author?.profile_url}
							className="w-8 h-8 text-tiny"
						/>
					</React.Fragment>
				))}
			</AvatarGroup>
			<Pagination
				className="mt-5"
				variant="light"
				color="secondary"
				showControls
				total={dataAnswer?.metadata.totalCount / 2}
				initialPage={1}
				onChange={handlechange}
			/>
			<Divider className="mt-5" />
			<FormAnswer questionId={result._id} />
		</div>
	);
};

export default QuestionDetails;
