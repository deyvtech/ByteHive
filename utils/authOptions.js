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
				// console.log(credentials)
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
	session: {
		strategy: "jwt"
	},
	// add token
	callbacks: {
		async signIn({ user, account }) {
			if (account.provider === 'google'){
				try {

					const { name, email, image } = user;
					// console.log(user);
					await connectToDatabase();

					const userExists = await User.findOne({ email });

					if (userExists) {
						return user;
					}

					const newUser = new User({
						name,
						email,
						profile_url: image
					})

					const response = await newUser.save();
					if (response.status === 200 || response.status === 201) {
						return user
					}

				} catch (error) {
					console.log(error)

					return null
				}
			}
			return user
		},
		async jwt({ token, user }) {
			if (user) {
				token.email = user.email;
			}
			console.log(user)

			return token
		},
		// call token in session
		async session({ session, token }) {
			if (session.user) {
				session.user.email = token.email;
			}
			// console.log(session)
			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn:"/"
	}
};
