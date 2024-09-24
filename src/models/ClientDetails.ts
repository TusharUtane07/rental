import mongoose, { Document, Schema } from "mongoose";

export interface ClientsData extends Document {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    age: number;
    email: string;
    address: string;
    city: string;
    pinCode: string;
    userId: string;
    bookingId: string;
};

const ClientDetailsSchema = new Schema<ClientsData>({
    firstName: {
        type: String,
        minLength: [3, "First Name must be at least 3 characters long"],
        maxLength: [100, "First Name must not exceed 100 characters"],
    },
    lastName: {
        type: String,
        minLength: [3, "last Name must be at least 3 characters long"],
        maxLength: [100, "last Name must not exceed 100 characters"],
    },
    phoneNumber: {
        type: Number,
        minLength: [3, "Phone Number must be at least 3 characters long"],
        maxLength: [100, "Phone Number must not exceed 100 characters"],
    },
    age: {
        type: Number,
        minLength: [3, "Age must be at least 3 characters long"],
        maxLength: [100, "Age must not exceed 100 characters"],
    },
    email: {
        type: String,
        minLength: [3, "Email must be at least 3 characters long"],
        maxLength: [100, "Email must not exceed 100 characters"],
    },
    city: {
        type: String,
        minLength: [3, "City must be at least 3 characters long"],
        maxLength: [100, "City must not exceed 100 characters"],
    },
    address: {
        type: String,
        minLength: [3, "Address must be at least 3 characters long"],
        maxLength: [100, "Address must not exceed 100 characters"],
    },
    pinCode: {
        type: String,
        minLength: [3, "Pincode must be at least 3 characters long"],
        maxLength: [100, "Pincode must not exceed 100 characters"],
    },
    userId: {
        type: String,
        minLength: [3, "Pincode must be at least 3 characters long"],
        maxLength: [100, "Pincode must not exceed 100 characters"],
    },
    bookingId: {
        type: String,
        minLength: [3, "Pincode must be at least 3 characters long"],
        maxLength: [100, "Pincode must not exceed 100 characters"],
    },

});

const ClientDetails = mongoose.models.ClientDetails || mongoose.model("ClientDetails", ClientDetailsSchema);

export default ClientDetails;