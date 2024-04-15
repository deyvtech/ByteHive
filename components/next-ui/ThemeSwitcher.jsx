"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMoon } from "react-icons/hi";
import { Button } from "@nextui-org/react";
import { HiSun } from "react-icons/hi2";
export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	return (
		<div>
			{theme === "light" ? (
				<Button
					isIconOnly
					variant="light"
					onClick={() => setTheme("dark")}
				>
					<HiMoon className="h-full w-6" />
				</Button>
			) : (
				<Button
					isIconOnly
					variant="dark"
					onClick={() => setTheme("light")}
				>
					<HiSun className="h-full w-6" />
				</Button>
			)}
		</div>
	);
}
