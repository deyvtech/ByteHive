import { getAllUser } from "@/lib/actions/user.action";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import React from "react";
const UsersPage = async () => {
	const users = await getAllUser();

	return (
		<div>
			<h1 className="text-4xl font-bold">Users</h1>
			<ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
				{users.map((user) => (
					<React.Fragment key={user._id}>
						<Card className="py-4" key={user._id}>
							<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
								<p className="text-tiny uppercase font-bold">
									Joined at{" "}
									{new Date(
										user.joined_at
									).toLocaleDateString("default", {
										month: "long",
									})}{" "}
									{new Date(user.joined_at).getFullYear()}
								</p>
								<small className="text-default-500">
									{user.questions.length} Question
									{user.questions.length <= 1 ? "" : "s"}
								</small>
								<h4 className="font-bold text-large">
									{user.name}
								</h4>
							</CardHeader>
							<CardBody className="overflow-visible py-2">
								<Image
									alt="Card background"
									className="object-cover rounded-xl"
									src={user?.profile_url}
									width={150}
								/>
							</CardBody>
						</Card>
					</React.Fragment>
				))}
			</ul>
		</div>
	);
};

export default UsersPage;
