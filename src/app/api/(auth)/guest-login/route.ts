import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from "@/database/dbConfig";

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();
        const guestId = uuidv4();
        const guestEmail = `${guestId}@guest.com`;
        const guestUsername = `guest_${guestId}`;

        let user = await User.findOne({ email: guestEmail });

        if (!user) {
            user = new User({
                username: guestUsername,
                email: guestEmail,
                role: "guest",
                isGuest: true,
                createdAt: new Date(),
            });

            await user.save();
            console.log("New guest user created: ", user);
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "10d" });

        const response = NextResponse.json({
            message: "Guest Sign In Successful",
            result: true
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({ message: "Guest Sign In Failed: internal server error", result: false }, { status: 400 });
    }
}
