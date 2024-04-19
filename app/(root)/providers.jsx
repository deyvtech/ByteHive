"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import Header from "@/components/Header";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

export function Providers({ children }) {
	const router = useRouter();

	return (
		<NextUIProvider navigate={router.push}>
			<NextThemesProvider attribute="class" defaultTheme="dark">
				<Header />
				<div className="flex">
					<Sidebar />
					<main className="w-[60%] p-10 ml-[20%] mt-[104px] h-[100vh]">
						{children}
					</main>
					<Widget />
				</div>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
