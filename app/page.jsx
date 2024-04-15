import Link from "next/link";

export default function HomePage() {
	return (
		<div>
			<div className="flex items-center justify-between ">
				<h1 className="text-4xl font-bold">Top Questions</h1>
				<Link
					href="/questions/ask"
					className="p-3 bg-primaryTheme-100 font-semibold rounded-md text-xl"
				>
					Ask a Question
				</Link>
			</div>
		</div>
	);
}
