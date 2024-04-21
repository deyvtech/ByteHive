"use client";

import React, { useEffect, useState } from "react";
import {
	Chip,
	Card,
	Skeleton,
	CardBody,
	CardHeader,
	CardFooter,
	Divider,
	Link,
} from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { getAllTags } from "@/lib/actions/tag.action";

let page = 2;

const TagInfiniteScroll = () => {
	const [ref, inView] = useInView();

	const [fetchAll, setFetchAll] = useState([]);
	const [loading, setLoading] = useState(false);
	const [maxPage, setMaxPage] = useState(false);
	useEffect(() => {
		const loadMore = async () => {
			try {
				if (inView && !maxPage) {
					setLoading(true);
					const { metadata, data } = await getAllTags(page);
					setFetchAll((prevFetchAll) => [...prevFetchAll, ...data]);

					if (
						Math.ceil(metadata.totalCount / metadata.pageSize) ===
						page
					) {
						setMaxPage(true);
					}

					page++;
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		loadMore();
	}, [inView]);

	useEffect(() => {
		page = 2;
	}, []);

	return (
		<>
			<ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
				{fetchAll.map((tag) => (
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
								<Link showAnchorIcon href={`tags/${tag._id}`}>
									Visit {tag.name}
								</Link>
							</CardFooter>
						</Card>
					</li>
				))}
			</ul>
			<div className=" flex gap-4" ref={ref}>
				{!maxPage && (
					<>
						<Card
							className="w-full mt-10 space-y-5 p-4"
							radius="lg"
						>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
						</Card>
						<Card
							className="w-full mt-10 space-y-5 p-4"
							radius="lg"
						>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
						</Card>
						<Card
							className="w-full mt-10 space-y-5 p-4"
							radius="lg"
						>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
							<Skeleton className="rounded-lg">
								<div className="h-10 rounded-lg bg-default-300"></div>
							</Skeleton>
						</Card>
					</>
				)}
			</div>
		</>
	);
};

export default TagInfiniteScroll;
