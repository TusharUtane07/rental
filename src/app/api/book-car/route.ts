import dbConnect from "@/database/dbConfig";
import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { getDataFromToken } from "@/helpers/getUserToken";

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();
        const requestBody = await request.json();
        const { carType, pickupCity, dropoffCity, pickupDate, dropoffDate, carImageUrl, status, userId } = requestBody;

        const newBooking = new Booking({
            carType,
            pickupCity,
            dropoffCity,
            pickupDate,
            dropoffDate,
            carImageUrl,
            status,
            userId
        });

        const savedBooking = await newBooking.save();
        console.log(savedBooking);

        return NextResponse.json({ message: "Booking details added", result: true }, { status: 200 });

    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ error: error.message, result: false }, { status: 401 });
    }
};

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();
        const userId = await getDataFromToken(request);

        const bookings = await Booking.find({ userId });

        if (bookings.length === 0) {
            return NextResponse.json({ message: "No bookings found", result: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Bookings retrieved successfully", result: true, data: bookings }, { status: 200 });

    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ error: error.message, result: false }, { status: 500 });
    }
};

