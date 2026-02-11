import { Button, Divider, Link } from "@nextui-org/react";
import Questions from "@/components/Question";
import { getAllQuestion } from "@/lib/actions/question.action";
import React, { Suspense } from "react"; // Added Suspense
import InfiniteScroll from "@/components/InfiniteScroll";
import TabsUI from "@/components/next-ui/TabsUI";

import { authOptions } from '@/utils/authOptions'
import { getServerSession } from 'next-auth'

export default async function HomePage({ searchParams }) {
	const session = await getServerSession(authOptions);

	const result = await getAllQuestion(
		1,
		5,
		session?.user.email,
		searchParams?.sort,
		searchParams?.search
	) || { metadata: { totalCount: 0 }, data: [], userId: null };

	const { metadata, data, userId } = result;

	const id = userId ? JSON.parse(JSON.stringify(userId)) : '';

	return (
		<>
			<div>
				<div className="flex items-center justify-between ">
					<h1 className="text-2xl md:text-4xl font-bold">All Questions</h1>
					<Link
						href="/questions/ask"
						className="p-3 bg-primaryTheme-100 text-white font-semibold rounded-md w-[200px] text-center justify-center"
					>
						Ask a Question
					</Link>
				</div>
				<div className="mt-10 flex items-center justify-between gap-5">
					<h3 className="text-tiny md:text-lg">
						{metadata?.totalCount || 0} question
						{(metadata?.totalCount || 0) <= 1 ? "" : "s"}
					</h3>

					<ul className="flex h-6 items-center space-x-0 md:space-x-3 text-small text-nowrap">
						<Suspense fallback={<div className="w-20 h-6 bg-gray-100 animate-pulse rounded" />}>
							<TabsUI />
						</Suspense>
					</ul>
				</div>

				{data && data.length > 0 ? (
					data.map((question) => (
						<React.Fragment key={question._id}>
							<Questions question={question} userId={id} />
						</React.Fragment>
					))
				) : (
					<h2 className="mt-10">No Question Result</h2>
				)}

				<Suspense fallback={null}>
					<InfiniteScroll />
				</Suspense>
			</div>
		</>
	);
}