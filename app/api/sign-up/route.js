import { NextResponse } from "next/server";
import connectToDatabase from "@/config/database";
import User from "@/models/User.model";
import bcryptjs from "bcryptjs";

// Getting the POST REQUEST

export async function POST(request) {
	try {
		await connectToDatabase();
		const { first_name, last_name, email_address, password } =
			await request.json();

		// if user already exists
        const user = await User.findOne({ email: email_address });

		if (user) {
			return NextResponse.json(
				{ error: "User Already Exists" },
				{ status: 400 }
			);
		}

		// password encrypt
		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		// save user to mongoDB
		const newUser = new User({
			name: `${first_name} ${last_name}`,
			email: email_address,
			password: hashedPassword,
			profile_url: `https://ui-avatars.com/api/?background=random&name=${first_name + last_name}`
        });
        
        
        await newUser.save();
		return NextResponse.json(
			{ message: "User Created Successfully" },
			{ status: 200 }
		);
    } catch (error) {
        console.error(error)
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
