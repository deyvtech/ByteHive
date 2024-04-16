import "@/assets/styles/globals.css";


const AuthLayout = ({ children }) => {
	return (
		<html lang="en">
			<body className="bg-darkTheme-100 h-[100vh]">
				<main className="h-full flex items-center">
				{children}
				</main>
			</body>
		</html>
	);
};

export default AuthLayout;
