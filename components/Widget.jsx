import { getTopQuestions } from "@/lib/actions/question.action";
import { getTopTags } from "@/lib/actions/tag.action";
import { Chip, Link } from "@nextui-org/react";
const Widget = async () => {
	const topQuestion = await getTopQuestions();
	const topTag = await getTopTags()
	return (
		<div className="w-[20%] hidden lg:block  dark:bg-darkTheme-100 h-[100vh] mt-[104px] py-6 fixed right-0 pl-5">
			<h2 className="text-lg font-semibold my-2">Top Questions</h2>

			<ul className="space-y-3">
				{topQuestion.map((question) => (
					<li key={question._id}>
						<Link
							href={`/questions/${question._id}`}
							className="text-md text-primaryTheme-700 cursor-pointer"
						>
							{question.title}
						</Link>
					</li>
				))}
			</ul>
			<h2 className="text-lg font-semibold mt-4 mb-2 ">Popular Tags</h2>
			<ul className="grid space-y-1">
				{topTag.map((tag) => (
					<li key={tag._id}>
						<Link href={`/tags/${tag.name}`}>
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
		</div>
	);
};

export default Widget;
