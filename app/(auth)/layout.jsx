import "@/assets/styles/globals.css";


const AuthLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<main>
				{children}
				</main>
			</body>
		</html>
	);
};

export default AuthLayout;
