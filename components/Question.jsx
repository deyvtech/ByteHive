'use client'

import { Chip, Button, Link } from "@nextui-org/react";
import {
	HiOutlineChatBubbleOvalLeft,
	HiOutlineHeart,
	HiOutlineEye,
} from "react-icons/hi2";

const Questions = () => {
	return (
		<div className="mt-5 bg-darkTheme-700 dark:bg-darkTheme-100 px-5 py-8 rounded-md">
			<h3 className="text-2xl">
				How to sort a list of objects in JavaScript?
			</h3>
			<p className="mt-2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Laboriosam modi nesciunt, dolor distinctio ipsa quo vitae! Vel
				maxime esse quod, libero laboriosam aut velit, dolorum sint qui,
				aliquid impedit repellat?...
			</p>
			<ul className="flex gap-2 mt-4">
				<li>
					<Link href="/tags/javascript">
						<Chip
							href="/tags/javascript"
							size="sm"
							className="rounded-sm text-primaryTheme-700 font-light"
						>
							Javascript
						</Chip>
					</Link>
				</li>
				<li>
					<Link href="/tags/reactjs">
						<Chip
							size="sm"
							className="rounded-sm text-primaryTheme-700 font-light"
						>
							React JS
						</Chip>
					</Link>
				</li>
				<li>
					<Link href="/tags/php">
						<Chip
							size="sm"
							className="rounded-sm text-primaryTheme-700 font-light"
						>
							PHP
						</Chip>
					</Link>
				</li>
			</ul>
			<div className="flex items-center justify-end gap-4 mt-5">
				<div className="flex items-center gap-2 ">
					<Button
						isIconOnly
						variant="light"
						aria-label="Like"
						className="dark-hover"
					>
						<HiOutlineHeart className="w-6 h-full" />
					</Button>
					1.5K Likes
				</div>
				<div className="flex items-center gap-2 ">
					<Button
						isIconOnly
						variant="light"
						aria-label="Comment"
						className="dark-hover"
					>
						<HiOutlineChatBubbleOvalLeft className="w-6 h-full" />
					</Button>
					24M Answers
				</div>
				<div className="flex items-center gap-2 ">
					<Button
						isIconOnly
						variant="light"
						aria-label="Views"
						className="dark-hover"
					>
						<HiOutlineEye className="w-6 h-full" />
					</Button>
					30K Views
				</div>
			</div>
		</div>
	);
};

export default Questions;
