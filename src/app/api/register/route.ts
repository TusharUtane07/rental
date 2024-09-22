import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "@/database/dbConfig";

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();

        const requestBody = await request.json();
        const { username, email, password } = requestBody;
        console.log(requestBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ message: "User already exits", result: false }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({ message: "User Registered Successfully", result: true, savedUser }, { status: 200 })

    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}