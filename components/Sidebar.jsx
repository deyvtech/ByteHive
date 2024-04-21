'use client'

import { HiTag, HiUserGroup, HiArrowLeftOnRectangle, HiUser  } from "react-icons/hi2";
import { redirect, usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import logo from "@/assets/images/bytehive.svg";
import Image from "next/image";
import { Button} from "@nextui-org/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Squash as Hamburger } from 'hamburger-react'
import { useState } from "react";

const Sidebar = () => {
	const pathname = usePathname();
	const { data: session } = useSession()
	const [isOpen, setOpen] = useState(false)

	
	return (
		<>
		<div className="mx-auto max-w-[max-content] fixed top-5 left-6 z-[999] block md:hidden">
			<Hamburger size={24} toggled={isOpen} toggle={setOpen} className="mx-auto"/>

			</div>
			<div className={`z-[99] w-[10%] lg:w-[20%] min-w-[100px] max-w-[100px] lg:max-w-[300px] bg-darkTheme-700 dark:bg-darkTheme-100  py-0 md:py-6 fixed ${!isOpen ? 'h-0 overflow-hidden' : 'h-[100vh]'} transition-all ease-in-out duration-300 md:h-[100vh]`}>
		

		<div className="mx-auto lg:mx-10 mt-16 lg:mt-6 text-md lg:text-2xl">
			<Link href="/" className="flex justify-center lg:justify-normal items-center gap-2">
				<Image
					src={logo}
					alt=""
					className="max-w-[30px]"
					width={0}
					heigt={0}
				/>
				<span className="hidden lg:block">ByteHive</span>
			</Link>
		</div>

		<ul className="flex flex-col  gap-6 mx-4 lg:mx-10 mt-10 font-semibold">
			<li>
				<Link
					href="/"
					className={`${
						pathname === "/"
							? "bg-primaryTheme-500 text-darkTheme-100"
							: ""
					} p-3 rounded-md flex items-center gap-4 hover:bg-primaryTheme-500 hover:text-darkTheme-100`}
				>
					<GoHomeFill className="w-6 h-full mx-auto lg:mx-[unset]" /> <span className="hidden lg:block">Home</span>
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
					<HiTag className="w-6 h-full mx-auto lg:mx-[unset]" /> <span className="hidden lg:block">Tags</span>
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
					<HiUserGroup className="w-6 h-full mx-auto lg:mx-[unset]" /> <span className="hidden lg:block">Users</span>
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
							<HiUser className="w-6 h-full mx-auto lg:mx-[unset]" /> <span className="hidden lg:block">Profile</span>
						</Link>
					</li>
					<li className="mt-[100px]">
						<Button
							className=" font-semibold w-full justify-start "
							size="lg"
							variant="light"
							radius="sm"
							onClick={() => {
								signOut()
								redirect('/sign-in')

							}}
						>
							<HiArrowLeftOnRectangle className="w-6 h-full mx-0 lg:mx-[unset]" />
							<span className="hidden lg:block">Logout</span>
						</Button>
					</li>
				</>
			)}
		</ul>
	</div>
		</>
	
	);
};

export default Sidebar;
