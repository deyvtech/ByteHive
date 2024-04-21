'use client'

import { HiMagnifyingGlass, HiBell } from "react-icons/hi2";
import {
	Button,
	Badge,
	Avatar,
	Input,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@nextui-org/react";
import ThemeSwitcher from "./next-ui/ThemeSwitcher";
import AuthButton from "./AuthButton";
import { useSession, signOut } from "next-auth/react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
	const { data: session } = useSession();

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [querySearch, setQuerySearch] = useState("");

	const handleSearch = () => {
		console.log(querySearch);
		const params = new URLSearchParams(searchParams.toString());
		params.set("search", querySearch);
		params.delete("sort");

		router.push(`${pathname}?${params.toString()}`, { scroll: false });
		setQuerySearch("");
	};
 
	return (
		<>
			<header className="z-[88] flex items-center justify-between px-4 md:px-10  py-6 text-white k dark:bg-darkTheme-100 md:dark:bg-darkTheme-100 bg-[#ededf1] fixed w-full">
				<div className="w-[60%] relative ml-[15%] md:ml-auto">
					<Input
						type="text"
						placeholder="Search"
						labelPlacement="outside"
						onChange={(e) => setQuerySearch(e.target.value)}
						value={querySearch}
						startContent={
							<Button
								isIconOnly
								variant="light"
								className="left-[-10px]"
								onClick={handleSearch}
							>
								<HiMagnifyingGlass className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
							</Button>
						}
					/>
				</div>
				<div className="flex items-center justify-end gap-5 w-[20%]">
					<ThemeSwitcher hidden={ false} />
					{session ? (
						<>
							{/* <Badge content="99+" shape="circle" color="danger">
								<Button
									radius="full"
									isIconOnly
									aria-label="more than 99 notifications"
									variant="light"
								>
									<HiBell size={24} />
								</Button>
							</Badge> */}
							<Dropdown>
								<DropdownTrigger>
									<Avatar
										showFallback
										src={session.user?.image}
										size="md"
										className="min-w-[45px] rounded-full"
									/>
								</DropdownTrigger>
								{!session && (
									<DropdownMenu aria-label="Static Actions">
									<DropdownItem key="signin" className="text-secondary-500 text-lg">Sign In</DropdownItem>
									<DropdownItem key="signup" className="text-primary-500 text-lg">Sign Up</DropdownItem>
								</DropdownMenu>
								)}
							</Dropdown>
						</>
					) : (
						<AuthButton />
					)}
				</div>
			</header>
		</>
	);
};

export default Header;
