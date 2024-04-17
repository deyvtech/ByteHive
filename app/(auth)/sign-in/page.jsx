"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signIn} from "next-auth/react";

export default function SignIn() {
	const router = useRouter();
	const initialValue = {
		email_address: "",
		password: "",
	};

	const [user, setUser] = useState(initialValue);
	const [error, setError] = useState({});
	const [submit, setSubmit] = useState(false);

	const handleOnchange = (e) => {
		const { name, value } = e.target;

		setUser((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmitSignIn = () => {
		setError(validateForm(user));
		setSubmit(true);
	};

  const signInForm = async () => {
		try {
			const signInRes = await signIn("credentials", {
				email: user.email_address,
				password: user.password,
				redirect: false,
			});

			if (signInRes?.error) {
				toast.error("Invalid Credentials");
			} else {
				router.push("/");
			}
		} catch (error) {
			if (error.response.status === 400) {
				toast.error("Invalid Credentials");
			}
			console.log(error.response);
		}
  };

  useEffect(() => {
		console.log(error);
		if (Object.keys(error).length === 0 && submit) {
			signInForm();
		}
  }, [error]);

  const validateForm = (data) => {
		const errors = {};
		const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

		if (!data.email_address) {
			errors.email_address = "Email Address is Required!";
		} else if (!regex.test(data.email_address)) {
			errors.email_address = "This is not a valid email address";
		}
		if (!data.password) {
			errors.password = "password is Required!";
		}
		return errors;
  };

  return (
		<>
			<Card className="mx-auto max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="johndoe@example.com"
								name="email_address"
								value={user.email_address}
								required
								onChange={handleOnchange}
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Password</Label>
								{/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
							</div>
							<Input
								id="password"
								type="password"
								required
								name="password"
								onChange={handleOnchange}
								value={user.password}
							/>
						</div>
						<Button
							type="submit"
							className="w-full"
							onClick={handleSubmitSignIn}
						>
							Login
						</Button>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => signIn("google")}
						>
							Login with Google
						</Button>
					</div>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/sign-up" className="underline">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>

			<Toaster />
		</>
  );
}
