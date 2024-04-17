import { HiMagnifyingGlass, HiBell } from "react-icons/hi2";
import { Button, Badge, Avatar, Input } from "@nextui-org/react";
import ThemeSwitcher from "./next-ui/ThemeSwitcher";
import AuthButton from "./AuthButton";
import { useSession, signOut } from "next-auth/react";
const Header = () => {
	const { data: session } = useSession();
	return (
		<>
			<header className="z-[999] flex items-center justify-between px-10  py-6 text-white dark:bg-darkTheme-100 bg-white fixed w-full">
				<div className="w-[60%] relative ml-auto">
					<Input
						type="text"
						placeholder="Search"
						labelPlacement="outside"
						startContent={
							<Button
								isIconOnly
								variant="light"
								className="left-[-10px]"
							>
								<HiMagnifyingGlass className="text-2xl text-default-400 pointer-events-none flex-shrink-0 " />
							</Button>
						}
					/>
				</div>
				<div className="flex items-center justify-end gap-5 w-[20%]">
					<ThemeSwitcher />
					{session ? (
						<>
							<Badge content="99+" shape="circle" color="danger">
								<Button
									radius="full"
									isIconOnly
									aria-label="more than 99 notifications"
									variant="light"
								>
									<HiBell size={24} />
								</Button>
							</Badge>

							<Avatar
								showFallback 
								src={`${session.user?.image}`}
								size="lg"
								name={`${session.user.name}`}
							/>
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
