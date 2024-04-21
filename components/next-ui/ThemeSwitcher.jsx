"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMoon } from "react-icons/hi";
import { Button, Switch} from "@nextui-org/react";
import { HiSun } from "react-icons/hi2";
export default function ThemeSwitcher(props) {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();


	
	const [isSelected, setIsSelected] = useState(true);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (isSelected) {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	}, [isSelected]);

	if (!mounted) return null;
	return (
		<div>
			<div className={`hidden md:block`}>
			<Switch
				isSelected={isSelected}
				onValueChange={setIsSelected}
				size="md"
				color="secondary"
				startContent={<HiSun className="h-full w-6" />}
				endContent={<HiMoon className="h-full w-6" />}
				></Switch>


			</div>
            {isSelected ? <HiSun className="h-full w-6 block md:hidden" onClick={() => setIsSelected(false)}/> : <HiMoon className="h-full w-6 block md:hidden" onClick={() => setIsSelected(true)}/>}
			
		</div>
	);
}
