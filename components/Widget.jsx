import { Chip, Link } from "@nextui-org/react";
const Widget = () => {
	return (
		<div className="w-[20%]  dark:bg-darkTheme-100 h-[100vh] mt-[104px] py-6 fixed right-0 pl-5">
			<h2 className="text-lg font-semibold my-2">Top Questions</h2>

			<ul className="space-y-3">
				<li>
					<Link className="text-md text-primaryTheme-700 cursor-pointer">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit?.
					</Link>
				</li>
				<li>
					<Link className="text-md text-primaryTheme-700 cursor-pointer">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit?.
					</Link>
				</li>
				<li>
					<Link className="text-md text-primaryTheme-700 cursor-pointer">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit?.
					</Link>
				</li>
				<li>
					<Link className="text-md text-primaryTheme-700 cursor-pointer">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit?.
					</Link>
				</li>
				<li>
					<Link className="text-md text-primaryTheme-700 cursor-pointer">
						Lorem ipsum dolor sit amet, consectetur adipisicing
						elit?.
					</Link>
				</li>
			</ul>

			<h2 className="text-lg font-semibold mt-4 mb-2 ">Popular Tags</h2>
			<ul className="grid space-y-1">
				<li>
					<Link href="/tags/reactjs">
						<Chip
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
							PHP
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
					<Link href="/tags/reactjs">
						<Chip
							size="sm"
							className="rounded-sm text-primaryTheme-700 font-light"
						>
							Node JS
						</Chip>
					</Link>
				</li>
				<li>
					<Link href="/tags/reactjs">
						<Chip
							size="sm"
							className="rounded-sm text-primaryTheme-700 font-light"
						>
							Laravel
						</Chip>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Widget;
