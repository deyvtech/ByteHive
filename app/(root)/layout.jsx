import "@/assets/styles/globals.css";
import "@/assets/styles/prism.css"
import { Providers } from "./providers";
import AuthProvider from "@/components/AuthProvider";

import Sidebar from "@/components/Sidebar";
import Widget from "@/components/Widget";
import Header from "@/components/Header";

export const metadata = {
	title: "ByteHive | StackOverflow Clone",
	description:
		"A platform for developers and programmers to seek assistance, share knowledge, and collaborate on coding and programming-related issues. Get answers to your programming problems and contribute to the community",
	keywords: "questions, find answers, ask questions",
};

export default async function RootLayout({ children }) {
	return (
		<AuthProvider>
			<html lang="en" className="dark">
				<body>
					<Providers>
						<Header />
						<div className="flex gap-4 lg:gap-0">
							<Sidebar />
							<main className="w-full md:w-[90%] lg:w-[60%] p-10 ml-0 md:ml-[10%] lg:ml-[20%] mt-[104px] h-[100vh]">
								{children}
							</main>
							<Widget />
						</div>
					</Providers>
				</body>
			</html>
		</AuthProvider>
	);
}
