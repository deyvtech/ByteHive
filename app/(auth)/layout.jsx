import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";

const AuthLayout = ({ children }) => {
	return (
		<AuthProvider>
			<html lang="en">
				<body className="bg-darkTheme-100 h-[100vh]">
					<main className="h-full flex items-center">{children}</main>
				</body>
			</html>
		</AuthProvider>
	);
};

export default AuthLayout;
