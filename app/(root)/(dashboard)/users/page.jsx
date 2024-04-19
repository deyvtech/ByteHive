import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

const UsersPage = () => {
	return (
		<div>
			<h1 className="text-4xl font-bold">Users</h1>
			<ul className="grid grid-cols-3 gap-4 mt-10">
				<Card className="py-4">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">
							Join at December 2023
						</p>
						<small className="text-default-500">12 Questions</small>
						<h4 className="font-bold text-large">
							Dave Lexter Supsup
						</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="https://i.pravatar.cc/200"
							width={150}
						/>
					</CardBody>
				</Card>
				<Card className="py-4">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">
							Join at December 2023
						</p>
						<small className="text-default-500">12 Questions</small>
						<h4 className="font-bold text-large">
							Dave Lexter Supsup
						</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="https://i.pravatar.cc/200"
							width={150}
						/>
					</CardBody>
				</Card>
				<Card className="py-4">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">
							Join at December 2023
						</p>
						<small className="text-default-500">12 Questions</small>
						<h4 className="font-bold text-large">
							Dave Lexter Supsup
						</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="https://i.pravatar.cc/200"
							width={150}
						/>
					</CardBody>
				</Card>
				<Card className="py-4">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">
							Join at December 2023
						</p>
						<small className="text-default-500">12 Questions</small>
						<h4 className="font-bold text-large">
							Dave Lexter Supsup
						</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="https://i.pravatar.cc/200"
							width={150}
						/>
					</CardBody>
				</Card>
				<Card className="py-4">
					<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
						<p className="text-tiny uppercase font-bold">
							Join at December 2023
						</p>
						<small className="text-default-500">12 Questions</small>
						<h4 className="font-bold text-large">
							Dave Lexter Supsup
						</h4>
					</CardHeader>
					<CardBody className="overflow-visible py-2">
						<Image
							alt="Card background"
							className="object-cover rounded-xl"
							src="https://i.pravatar.cc/200"
							width={150}
						/>
					</CardBody>
				</Card>
			</ul>
		</div>
	);
};

export default UsersPage;
