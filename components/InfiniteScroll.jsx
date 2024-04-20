"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Skeleton, Pagination } from "@nextui-org/react";
import { getAllQuestion } from "@/lib/actions/question.action";
import Questions from "./Question";
import { useInView } from "react-intersection-observer";

let page = 2


const InfiniteScroll = () => {
	const [ref, inView] = useInView();

	const [fetchAll, setFetchAll] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [maxPage, setMaxPage] = useState(false)
	useEffect(() => {
        const loadMore = async () => {
            try {
                if (inView && !maxPage) {
                    setLoading(true);
                    const {metadata, data } = await getAllQuestion(page);
                    setFetchAll(prevFetchAll => [...prevFetchAll, ...data]);

                    if (Math.ceil(metadata.totalCount / metadata.pageSize) === page) {
                        setMaxPage(true)
                    }

                    page++
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
        page = 2
    },[])

	return (
		<div >
			{fetchAll.map((question) => (
				<React.Fragment key={question._id}>
					<Questions question={question} />
				</React.Fragment>
            ))}

			<div className="mt-5" ref={ref}>
				{!maxPage && (
					<Card className="w-full mt-10 space-y-5 p-4" radius="lg">
						<Skeleton className="rounded-lg">
							<div className="h-16 rounded-lg bg-default-300"></div>
						</Skeleton>
						<div className="flex gap-4">
							<Skeleton className="w-[50px] rounded-lg">
								<div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-[50px] rounded-lg">
								<div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-[50px] rounded-lg">
								<div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
						<div className="flex justify-end gap-4">
							<Skeleton className="w-[100px] rounded-lg">
								<div className="h-6 w-3/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-[100px]  rounded-lg">
								<div className="h-6 w-4/5 rounded-lg bg-default-200"></div>
							</Skeleton>
							<Skeleton className="w-[100px]  rounded-lg">
								<div className="h-6 w-2/5 rounded-lg bg-default-300"></div>
							</Skeleton>
						</div>
					</Card>
				)}
			</div>
		</div>
	);
};

export default InfiniteScroll;
