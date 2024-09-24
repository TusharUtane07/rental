import dbConnect from "@/database/dbConfig";
import ClientDetails from "@/models/ClientDetails";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();
        const requestBody = await request.json();
        const { firstName, lastName, phoneNumber, age, email, address, city, pinCode, userId, bookingId } = requestBody;

        const newDetails = new ClientDetails({
            firstName,
            lastName,
            phoneNumber,
            age,
            email,
            address,
            city,
            pinCode,
            userId,
            bookingId
        });

        const clientDetails = await newDetails.save();

        return NextResponse.json({ message: "Client details added", result: true }, { status: 200 });

    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ error: error.message, result: false }, { status: 401 });
    }
};

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();

        const newDetails = await ClientDetails.find();

        if (newDetails.length === 0) {
            return NextResponse.json({ message: "No details found", result: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Client details retrieved successfully", result: true, data: newDetails }, { status: 200 });

    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ error: error.message, result: false }, { status: 500 });
    }
};

