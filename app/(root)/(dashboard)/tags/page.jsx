import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Chip} from "@nextui-org/react";

const TagsPage = () => {
	return (
		<div>
			<h1 className="text-4xl font-bold">Tags</h1>
			<p className="my-4">
				A tag is a keyword or label that categorizes your question with
				other, similar questions. Using the right tags makes it easier
				for others to find and answer your question.
			</p>

			<ul className="grid grid-cols-3 gap-4">
				<li>
					<Card className="max-w-[400px]">
						<CardHeader className="flex gap-3">
							
							<div className="flex flex-col">
							<Chip
							size="sm"
							className="rounded-sm text-primaryTheme-700 font-light"
						>
							Javascript
						</Chip>
							</div>
						</CardHeader>
						<Divider />
						<CardBody>
							<p>
								JavaScript is a high-level, dynamic, interpreted
								programming language primarily used for creating
								interactive web pages and web applications.
								Initially developed by Brendan Eich in 1995,
							</p>
						</CardBody>
						<Divider />
						<CardFooter>
							<Link
								isExternal
								showAnchorIcon
								href="/tags/javascript"
							>
								Visit Javascript
							</Link>
						</CardFooter>
					</Card>
				</li>

			</ul>
		</div>
	);
};

export default TagsPage;
