'use client'

import { HiBookmark, HiTag, HiUserGroup, HiArrowLeftOnRectangle, HiUser  } from "react-icons/hi2";
import { redirect, usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import logo from "@/assets/images/bytehive.svg";
import Image from "next/image";
import { Button} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
	const pathname = usePathname();
	const {data: session} = useSession()
	return (
		<div className="z-[99] w-[20%] max-w-[300px] bg-darkTheme-700 dark:bg-darkTheme-100 h-[100vh] py-6 fixed">
			<div className="mx-10 mt-6 text-2xl">
				<Link href="/" className="flex items-center gap-2">
					<Image
						src={logo}
						alt=""
						className="max-w-[30px]"
						width={0}
						heigt={0}
					/>
					ByteHive
				</Link>
			</div>

			<ul className="flex flex-col  gap-6 mx-10 mt-10 font-semibold">
				<li>
					<Link
						href="/"
						className={`${
							pathname === "/"
								? "bg-primaryTheme-500 text-darkTheme-100"
								: ""
						} p-3 rounded-md flex items-center gap-4 hover:bg-primaryTheme-500 hover:text-darkTheme-100`}
					>
						<GoHomeFill className="w-6 h-full" /> Home
					</Link>
				</li>
				<li>
					<Link
						href="/tags"
						className={`${
							pathname === "/tags"
								? "bg-primaryTheme-500 text-darkTheme-100"
								: ""
						} p-3 rounded-md flex items-center gap-4 hover:bg-primaryTheme-500 hover:text-darkTheme-100`}
					>
						<HiTag className="w-6 h-full" /> Tags
					</Link>
				</li>
				<li>
					<Link
						href="/users"
						className={`${
							pathname === "/users"
								? "bg-primaryTheme-500 text-darkTheme-100"
								: ""
						} p-3 rounded-md flex items-center gap-4 hover:bg-primaryTheme-500 hover:text-darkTheme-100`}
					>
						<HiUserGroup className="w-6 h-full" /> Users
					</Link>
				</li>

				{session && (
					<>
					<li>
							<Link
								href="/profile"
								className={`${
									pathname === "/profile"
										? "bg-primaryTheme-500 text-darkTheme-100"
										: ""
								} p-3 rounded-md flex items-center gap-4 hover:bg-primaryTheme-500 hover:text-darkTheme-100`}
							>
								<HiUser className="w-6 h-full" /> Profile
							</Link>
						</li>

						<li>
							<Link
								href="/bookmarks"
								className={`${
									pathname === "/bookmarks"
										? "bg-primaryTheme-500 text-darkTheme-100"
										: ""
								} p-3 rounded-md flex items-center gap-4 hover:bg-primaryTheme-500 hover:text-darkTheme-100`}
							>
								<HiBookmark className="w-6 h-full" /> Bookmark
							</Link>
						</li>

						<li className="mt-[100px]">
							<Button
								className=" font-semibold w-full justify-start"
								size="lg"
								variant="light"
								radius="sm"
								onClick={() => {
									signOut()
									redirect('/sign-in')

								}}
							>
								<HiArrowLeftOnRectangle className="w-6 h-full" />
								Logout
							</Button>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default Sidebar;
