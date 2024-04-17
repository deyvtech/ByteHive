'use client'
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

const AuthButton = () => {
    const router = useRouter();

	return (
		<div className="flex h-5 items-center space-x-4 text-small">
			<Button onClick={() => router.push("/sign-in")} variant="light" color="secondary">
				Sign in
			</Button>
			<Divider orientation="vertical" />
			<Button onClick={() => router.push("/sign-up")}  variant="light" color="primary">
				Sign up
			</Button>
		</div>
	);
};

export default AuthButton;
