import connectToDatabase from "@/config/database";
import User from "@/models/User.model";
import bcryptjs from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials;
				console.log(password)
				try {
					await connectToDatabase();
					const user = await User.findOne({ email: email });
					if (!user) return null;

					const validPassword = await bcryptjs.compare(
						password,
						user.password
					);

					if (!validPassword) {
						return null;
					}
					// Return the user object if authentication succeeds
					return user;
				} catch (error) {
					console.error("Authentication error:", error.message);
					return null; // Return null or false to indicate authentication failure
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	// add jwt as token
	session: {
		strategy: "jwt"
	},
	// add token
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user._id
				token.email = user.email;
				token.name = user.name;
			}

			return token
		},
		// call token in session
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id;
				session.user.email = token.email;
				session.user.name = token.name;
			}
			console.log(session)
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn:"/"
	}
};
