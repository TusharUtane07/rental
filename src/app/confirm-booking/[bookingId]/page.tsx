"use client";
import axiosInstance from "@/lib/axios";
import React, { useEffect, useState } from "react";

const ConfirmBooking = ({ params }: any) => {
	const [bookingDetails, setBookingDetails] = useState();
	const bookingId = params.bookingId;

	const getBookingDetails = async () => {
		try {
			const response = await axiosInstance.get(`/api/book-car/${bookingId}`);
			const data = response.data;
			if (data.result) {
				console.log("Booking fetched");
				setBookingDetails(data.data);
			} else {
				console.log("Error fetching booking details");
			}
		} catch (error: any) {
			console.log(error);
		}
	};
	console.log(bookingDetails);
	useEffect(() => {
		getBookingDetails();
	}, []);

	return <div></div>;
};

export default ConfirmBooking;
