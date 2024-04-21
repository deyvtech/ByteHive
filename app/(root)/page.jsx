import { Button, Divider, Link } from "@nextui-org/react";
import Questions from "@/components/Question";
import { getAllQuestion } from "@/lib/actions/question.action";
import React from "react";
import InfiniteScroll from "@/components/InfiniteScroll";
import TabsUI from "@/components/next-ui/TabsUI";
export default async function HomePage() {
	const { metadata, data } = await getAllQuestion();

	return (
		<>
			<div>
				<div className="flex items-center justify-between ">
					<h1 className="text-4xl font-bold">All Questions</h1>
					<Link
						href="/questions/ask"
						className="p-3 bg-primaryTheme-100 text-white font-semibold rounded-md w-[200px] text-center justify-center"
					>
						Ask a Question
					</Link>
				</div>
				<div className="mt-10 flex items-center justify-between">
					<h3 className="text-lg">
						{metadata.totalCount} question
						{metadata.totalCount <= 1 ? "" : "s"}
					</h3>

					<ul className="flex h-6 items-center space-x-3 text-small">
						<TabsUI />
					</ul>
				</div>
				{metadata.totalCount !== 0 ? (
					data.map((question) => (
						<React.Fragment key={question._id}>
							<Questions question={question} />
						</React.Fragment>
					))
				) : (
					<h2 className="mt-10">No Question Result</h2>
				)}

				<InfiniteScroll />
			</div>
		</>
	);
}
