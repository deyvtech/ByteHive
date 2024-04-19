import {
	Divider,
	Link,
	Chip,
	Card,
	CardBody,
	Avatar,
	CardFooter,
	AvatarGroup,
} from "@nextui-org/react";
import QuestionContentDetails from "./QuestionContentDetails";
import Time from "./Time";
import FormAnswer from "./FormAnswer";
import HtmlParse from "./HtmlParse";

const QuestionDetails = ({ result }) => {
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
				<Time time={new Date(result.createdAt)} text={"Asked"} />
				<div className="flex justify-center items-center gap-2 mt-2">
					<Avatar
						size="sm"
						showFallback
						name={result.author?.name}
						src={result.author?.images}
						className="w-8 h-8 text-tiny"
					/>
					<p className="text-tiny">{result.author?.name}</p>
				</div>
			</div>
			<Divider className="mt-5" />
			{result.answers.map((answer) => (
				<>
					<Card className="rounded-sm my-5">
						<CardBody className="rounded-sm">
							<HtmlParse content={answer.content} />
						</CardBody>
						<CardFooter className="mt-2 flex-col items-end justify-end">
						<Avatar
							size="sm"
							showFallback
							name={answer.author?.name}
							src={answer.author?.images}
							className="w-8 h-8 text-tiny"
						/>
							<Time
								time={new Date(answer.createdAt)}
								text={"Answered"}
							/>
						</CardFooter>
					</Card>
				</>
			))}
			<AvatarGroup
				isBordered
				max={5}
				total={result.answers.length}
				className="ml-auto justify-end"
			>
				{result.answers.map((answer) => (
					<>
						<Avatar
							size="sm"
							showFallback
							name={answer.author?.name}
							src={answer.author?.images}
							className="w-8 h-8 text-tiny"
						/>
					</>
				))}
			</AvatarGroup>
			<Divider className="mt-5" />
			<FormAnswer questionId={result._id} />
		</div>
	);
};

export default QuestionDetails;
