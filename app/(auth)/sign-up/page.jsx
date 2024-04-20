"use client";
import axios from "axios";

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
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function SignUp() {

	const router = useRouter();
	const initialValue = {
		first_name: "",
		last_name: "",
		email_address: "",
		password: "",
	};

	const [form, setForm] = useState(initialValue);
	const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  
	const handleOnchange = (e) => {
		const { name, value } = e.target;

		setForm((prev) => {
			return { ...prev, [name]: value };
		});
	};

	const handleSubmitSignUp = () => {
		setError(validateForm(form));
		setSubmit(true);
  };
  
  const signUpForm = async () => {
    try {
      await axios.post(`${API_DOMAIN}/sign-up`, form, {
        headers: { "Content-Type": "application/json" },
      });

		toast.success('Successfully Signup');
		
		setTimeout(() => {
			router.push('/sign-in')
		}, 1000)
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('User Already Exist')
      }
      console.log(error.response)
    }
 }

	useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      signUpForm()
    }
	}, [error]);



	const validateForm = (data) => {
		const errors = {};
		const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
		if (!data.first_name) {
			errors.first_name = "Firstname is Required!";
		}
		if (!data.last_name) {
			errors.last_name = "Lastname is Required!";
		}
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
				<CardTitle className="text-xl">Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								name="first_name"
								id="first-name"
								placeholder="John"
								required
                onChange={handleOnchange}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								name="last_name"
								id="last-name"
								placeholder="Doe"
								required
                onChange={handleOnchange}
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							name="email_address"
							id="email"
							type="email"
							placeholder="johndoe@example.com"
							required
              onChange={handleOnchange}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							name="password"
							id="password"
							type="password"
              onChange={handleOnchange}
						/>
					</div>
					<Button
						type="submit"
						className="w-full"
						onClick={handleSubmitSignUp}
					>
						Create an account
					</Button>
					<Button variant="outline" className="w-full" onClick={() => signIn('google')}>
						Sign up with Google
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Already have an account?{" "}
					<Link href="/sign-in" className="underline">
						Sign in
					</Link>
				</div>
			</CardContent>
    </Card>
    <Toaster />
    </>
		
	);
}
