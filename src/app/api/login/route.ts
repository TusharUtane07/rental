import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from "@/database/dbConfig";

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();
        const requestBody = await request.json();
        const { email, password } = requestBody;
        console.log(requestBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User does not exists", result: false }, { status: 400 });
        }
        console.log("User exits", user);

        const validPassword = await bcryptjs.compare(password, user.password);
        console.log("valid password: ", validPassword);
        if (!validPassword) {
            return NextResponse.json({ message: "Invalid Password", result: false }, { status: 400 });
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({
            message: "Sign In Successfull",
            result: true
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Login Failed internal server error", result: false }, { status: 400 })
    }
}