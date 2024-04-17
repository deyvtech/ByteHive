'use client'
import { Button, Divider } from "@nextui-org/react";
import { useRouter } from 'next/navigation'

const AuthButton = () => {
    const router = useRouter();

	return (
		<div className="flex h-5 items-center space-x-4 text-small">
			<Button onClick={() => router.push("/sign-in")} color="primary">
				Sign in
			</Button>
			<Divider orientation="vertical" />
			<Button onClick={() => router.push("/sign-up")} color="secondary">
				Sign up
			</Button>
		</div>
	);
};

export default AuthButton;
