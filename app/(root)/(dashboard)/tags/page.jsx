import { getAllTags } from "@/lib/actions/tag.action";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Chip,
} from "@nextui-org/react";

const TagsPage = async () => {
	const tags = await getAllTags();
	return (
		<div>
			<h1 className="text-4xl font-bold">Tags</h1>
			<p className="my-4">
				A tag is a keyword or label that categorizes your question with
				other, similar questions. Using the right tags makes it easier
				for others to find and answer your question.
			</p>

			<ul className="grid grid-cols-3 gap-4">
				{tags.map((tag) => (
					<li key={tag._id}>
						<Card className="max-w-[400px]">
							<CardHeader className="flex gap-3">
								<div className="flex flex-col">
									<Chip
										size="sm"
										className="rounded-sm text-primaryTheme-700 font-light"
									>
										{tag.name}
									</Chip>
								</div>
							</CardHeader>
							<Divider />
							<CardBody>
								<p>
									{tag.questions.length} question
									{tag.questions.length <= 1 ? "" : "s"}
								</p>
							</CardBody>
							<Divider />
							<CardFooter>
								<Link
									showAnchorIcon
									href={`tags/${tag._id}`}
								>
									Visit {tag.name}
								</Link>
							</CardFooter>
						</Card>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TagsPage;
