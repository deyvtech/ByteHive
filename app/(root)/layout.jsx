import "@/assets/styles/globals.css";
import { Providers } from "./providers";

export const metadata = {
	title: "ByteHive | StackOverflow Clone",
	description:
		"A platform for developers and programmers to seek assistance, share knowledge, and collaborate on coding and programming-related issues. Get answers to your programming problems and contribute to the community",
	keywords: "questions, find answers, ask questions",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className="sky-dark">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
