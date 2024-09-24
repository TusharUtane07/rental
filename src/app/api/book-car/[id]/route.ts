import dbConnect from "@/database/dbConfig";
import Booking from "@/models/Booking";
import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json({ message: "Invalid booking ID", result: false }, { status: 400 });
        }

        const booking = await Booking.findById(id);
        if (!booking) {
            return NextResponse.json({ message: "Booking not found", result: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Booking retrieved successfully", result: true, data: booking }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message, result: false }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        if (!id || !isValidObjectId(id)) {
            return NextResponse.json({ message: "Invalid booking ID", result: false }, { status: 400 });
        }

        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return NextResponse.json({ message: "Booking not found", result: false }, { status: 404 });
        }
        return NextResponse.json({ message: "Booking deleted successfully", result: true }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message, result: false }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json({ message: "Invalid booking ID", result: false }, { status: 400 });
        }

        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json({ message: "Status field is required", result: false }, { status: 400 });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedBooking) {
            return NextResponse.json({ message: "Booking not found", result: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Booking status updated successfully", result: true, data: updatedBooking }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message, result: false }, { status: 500 });
    }
}
