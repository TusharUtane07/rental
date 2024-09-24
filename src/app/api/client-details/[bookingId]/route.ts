import dbConnect from "@/database/dbConfig";
import ClientDetails from "@/models/ClientDetails";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, { params }: { params: { bookingId: string } }) => {
    try {
        await dbConnect();

        const { bookingId } = params;

        const clientDetails = await ClientDetails.findOne({ bookingId });

        if (!clientDetails) {
            return NextResponse.json({ message: "No details found with this bookingId", result: false }, { status: 404 });
        }

        return NextResponse.json({ message: "Client details retrieved successfully", result: true, data: clientDetails }, { status: 200 });

    } catch (error: any) {
        console.log(error, error.message);
        return NextResponse.json({ error: error.message, result: false }, { status: 500 });
    }
};
