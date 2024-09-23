import mongoose, { Schema } from "mongoose";

export interface Booking extends Document {
    carType: string;
    pickupCity: string;
    dropoffCity: string;
    pickupDate: string;
    dropoffDate: string;
    carImageUrl: string;
    status: string;
}

const BookingSchema = new Schema<Booking>({
    carType: {
        type: String,
        required: [true, "Car Type is required"],
    },
    pickupCity: {
        type: String,
        required: [true, "Car Type is required"],
    },
    dropoffCity: {
        type: String,
        required: [true, "Car Type is required"],
    },
    pickupDate: {
        type: String,
        required: [true, "Car Type is required"],
    },
    dropoffDate: {
        type: String,
        required: [true, "Car Type is required"],
    },
    carImageUrl: {
        type: String,
        required: [true, "Car Type is required"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
    },
})

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking; 