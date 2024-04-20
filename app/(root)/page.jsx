import { Button, Divider, Link } from "@nextui-org/react";
import Questions from "@/components/Question";
import { getAllQuestion } from "@/lib/actions/question.action";
import React from "react";
export default async function HomePage() {
	const fetchAll = await getAllQuestion()
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
					<h3 className="text-lg">{fetchAll.count} question{ fetchAll.count <= 1 ? '' : 's'}</h3>

					<ul className="flex h-6 items-center space-x-3 text-small">
						<li>
							<Button
								radius="sm"
								className="dark:text-primaryTheme-500 bg-primaryTheme-500 dark:bg-darkTheme-200 font-medium "
							>
								Newest
							</Button>
						</li>
						<Divider orientation="vertical" />
						<li>
							<Button
								radius="sm"
								variant="light"
								className="dark:hover:text-primaryTheme-500 text-primaryTheme-700"
							>
								Week
							</Button>
						</li>
						<Divider orientation="vertical" />

						<li>
							<Button
								radius="sm"
								variant="light"
								className="dark:hover:text-primaryTheme-500 text-primaryTheme-700"
							>
								Month
							</Button>
						</li>
						<Divider orientation="vertical" />

						<li>
							<Button
								radius="sm"
								variant="light"
								className="dark:hover:text-primaryTheme-500 text-primaryTheme-700"
							>
								Unaswered
							</Button>
						</li>
					</ul>
				</div>
				{
					fetchAll.questions.length !== 0 ? fetchAll.questions.map((question) => (
						<React.Fragment key={question._id}>
						<Questions
						question={question}
						/>
						</React.Fragment>
					)) : (
							<h2 className="mt-10">No Question Result</h2>
				)
				}
			</div>
		</>
	);
}
