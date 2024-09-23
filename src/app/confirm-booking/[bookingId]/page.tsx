"use client";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

// Define types for booking details
interface BookingDetails {
	status: string;
	pickupCity: string;
	dropoffCity: string;
	pickupDate: string;
	dropoffDate: string;
	carType: string;
	carImageUrl: string;
}

// Define the type for the component props
interface ConfirmBookingProps {
	params: {
		bookingId: string;
	};
}

const ConfirmBooking: React.FC<ConfirmBookingProps> = ({ params }) => {
	const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const bookingId = params?.bookingId;

	// API call to fetch booking details
	const getBookingDetails = useCallback(async () => {
		if (!bookingId) {
			setError("Invalid booking ID");
			setLoading(false);
			return;
		}

		try {
			const response = await axiosInstance.get(`/api/book-car/${bookingId}`);
			const data = response.data;

			if (data.result) {
				setBookingDetails(data.data);
				setError(null); // Reset any previous errors
				console.log("Booking fetched");
			} else {
				setError("Error fetching booking details");
				console.log("Error fetching booking details");
			}
		} catch (err: any) {
			setError("An error occurred while fetching booking details");
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, [bookingId]);

	// Fetch booking details on component mount
	useEffect(() => {
		getBookingDetails();
	}, [getBookingDetails]);

	// Conditional rendering
	if (loading) {
		return <p>Loading booking details...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (!bookingDetails) {
		return <p>No booking details found.</p>;
	}

	return (
		<section className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="bg-gray-600 text-white p-3">Confirm Ride</h1>
				<div className="bg-gray-200 p-3 rounded-md mt-2">
					{" "}
					<p className="flex justify-center text-3xl">
						<AiFillInfoCircle />
					</p>
					<h3 className="font-medium">
						Upon completing this reservation enquiry, you will receive:{" "}
					</h3>
					<p className="text-gray-600 pt-2">
						Your rental voucher to produce on arrival at the rental desk and a
						toll-free customer support number.
					</p>
				</div>
				<div className="my-8 bg-gray-200 p-3 rounded-md md:p-8">
					{/* Booking details */}
					<div className="text-lg font-medium flex flex-col gap-2 capitalize  ">
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500">
								<thead className="text-xs text-white uppercase bg-gray-600">
									<tr>
										<th scope="col" className="px-6 py-3">
											Field
										</th>
										<th scope="col" className="px-6 py-3">
											Value
										</th>
									</tr>
								</thead>
								<tbody>
									<tr className="bg-white border-b">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											Booking Status
										</th>
										<td className="px-6 py-4">
											{bookingDetails.status || "N/A"}
										</td>
									</tr>
									<tr className="bg-white border-b">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											Pickup City
										</th>
										<td className="px-6 py-4">
											{bookingDetails.pickupCity || "N/A"}
										</td>
									</tr>
									<tr className="bg-white border-b">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											Drop Off City
										</th>
										<td className="px-6 py-4">
											{bookingDetails.dropoffCity || "N/A"}
										</td>
									</tr>
									<tr className="bg-white border-b">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											Pickup Date
										</th>
										<td className="px-6 py-4">
											{bookingDetails.pickupDate || "N/A"}
										</td>
									</tr>
									<tr className="bg-white border-b">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											Drop Off Date
										</th>
										<td className="px-6 py-4">
											{bookingDetails.dropoffDate || "N/A"}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="text-2xl lg:text-4xl lg:my-12 lg:gap-4 text-center font-bold flex flex-col gap-2 capitalize my-6">
						<h4>{bookingDetails.carType || "Car type not specified"}</h4>
						{bookingDetails.carImageUrl ? (
							<Image
								src={bookingDetails.carImageUrl}
								alt="car-image"
								height={500}
								width={500}
								className="rounded-md md:mx-auto lg:h-[600px] lg:w-auto"
							/>
						) : (
							<p>Car image not available</p>
						)}
					</div>

					<div className="border border-gray-600/10"></div>
					<div className="my-4 mt-10 md:my-8 md:mt-14">
						<h4 className="font-bold text-2xl md:text-3xl text-center">
							Personal Details
						</h4>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:my-5 md:p-6">
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="full-name" className="">
									First Name
								</label>
								<input
									id="full-name"
									type="text"
									placeholder="Enter your full name"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="last-name">Last Name</label>
								<input
									id="last-name"
									type="text"
									placeholder="Enter your last name"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="number">Phone Number</label>
								<input
									id="number"
									type="text"
									placeholder="Enter your phone number"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="age">Age</label>
								<input
									id="age"
									type="text"
									placeholder="Enter your age"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="text"
									placeholder="Enter your email"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="address">Address</label>
								<input
									id="address"
									type="text"
									placeholder="Enter your address"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="city">City</label>
								<input
									id="city"
									type="text"
									placeholder="Enter your city"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
							<div className="flex flex-col gap-1 my-2 mt-5">
								<label htmlFor="pin-code">Pin Code</label>
								<input
									id="pin-code"
									type="text"
									placeholder="Enter your full name"
									className="h-12 px-3 rounded-md outline-none focus:outline-gray-600"
								/>
							</div>
						</div>
						<button className="bg-gray-600 lg:py-3 text-white rounded-md w-full py-2 mt-3">
							Confirm Checkout
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ConfirmBooking;
