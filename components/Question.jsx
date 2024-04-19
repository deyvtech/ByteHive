import { Chip, Button, Link } from "@nextui-org/react";
import {
	HiOutlineChatBubbleOvalLeft,
	HiOutlineHeart,
	HiOutlineEye,
} from "react-icons/hi2";

const Questions = ({ question }) => {
	return (
		<div className="mt-5 bg-darkTheme-700 dark:bg-darkTheme-100 px-5 py-8 rounded-md">
			<Link href={`/questions/${question._id}`} className="text-2xl text-darkTheme-100  dark:text-white">{question.title}</Link>
			<ul className="flex gap-2 mt-4">
				{question.tags.map((tag) => (
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
