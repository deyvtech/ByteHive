'use client'

import Link from "next/link";
import { HiBookmark, HiTag, HiUserGroup, HiArrowLeftOnRectangle } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { GoHomeFill } from "react-icons/go";
import logo from "@/assets/images/bytehive-logo.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";

const Sidebar = () => {
  const pathname = usePathname();
	return (
    <div className="w-[20%] bg-darkTheme-700 dark:bg-darkTheme-100 h-[100vh] py-6 fixed">
      <div className="mb-6">
					<Image
						src={logo}
						alt=""
						className="max-w-[200px] mx-auto"
						width={0}
						heigt={0}
					/>
      </div>
      
			<ul className="flex flex-col gap-6 mx-10 font-semibold">
				<li>
					<Link href="/" className={`${pathname === '/' ? 'bg-primaryTheme-500 text-darkTheme-100' : ''} p-3 rounded-md flex items-center gap-4`}>
						<GoHomeFill className="w-6 h-full" /> Home
					</Link>
				</li>
				<li >
					<Link href="/tags" className={`${pathname === '/tags' ? 'bg-primaryTheme-500 text-darkTheme-100' : ''} p-3 rounded-md flex items-center gap-4`}>
						<HiTag className="w-6 h-full" /> Tags
					</Link>
				</li>
				<li>
					<Link href="/users" className={`${pathname === '/users' ? 'bg-primaryTheme-500 text-darkTheme-100' : ''} p-3 rounded-md flex items-center gap-4`}>
						<HiUserGroup className="w-6 h-full" /> Users
					</Link>
				</li>
				<li>
					<Link href="/bookmarks" className={`${pathname === '/bookmarks' ? 'bg-primaryTheme-500 text-darkTheme-100' : ''} p-3 rounded-md flex items-center gap-4`}>
						<HiBookmark className="w-6 h-full" /> Bookmark
					</Link>
        </li>
        <li className="mt-[100px]">
          <Button className=" font-semibold w-full" size="lg" variant="light">
          <HiArrowLeftOnRectangle className="w-6 h-full"/>
            Logout
          </Button>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
