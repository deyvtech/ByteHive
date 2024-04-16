import { HiMagnifyingGlass, HiBell } from "react-icons/hi2";
import { Button, Badge, Avatar, Input } from "@nextui-org/react";
import ThemeSwitcher from "./next-ui/ThemeSwitcher";


const Header = () => {
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
						src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
						size="lg"
					/>
				</div>
			</header>
		</>
	);
};

export default Header;