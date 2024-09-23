"use client";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface BookingDetail {
	carImageUrl: string;
	carType: string;
	dropoffCity: string;
	dropoffDate: string;
	pickupCity: string;
	pickupDate: string;
	status: string;
	_id: string;
}

const BookingStatus: React.FC = () => {
	const [bookingDetails, setBookingDetails] = useState<BookingDetail[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	const router = useRouter();

	const getBookingDetails = async () => {
		try {
			const response = await axiosInstance.get("/api/book-car/");
			const data = response.data;

			if (data.result) {
				console.log(data);
				setBookingDetails(data.data);
			} else {
				toast.error("Some Technical Error Occurred");
			}
		} catch (error) {
			console.log("error getting details", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async (id: string) => {
		try {
			if (!id) {
				console.log("Invalid Id");
				toast.error("Server Error Occured");
				return;
			}

			const response = await axiosInstance.delete(`/api/book-car/${id}`);

			if (response.data.result) {
				toast.success("Booking Deleted");
				window.location.reload();
			} else {
				toast.error("Error Occured");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		getBookingDetails();
	}, []);

	if (loading) {
		return <div className="text-3xl">Loading...</div>;
	}
	return (
		<div
			className="booking-status my-20
        ">
			{bookingDetails.length > 0 ? (
				<div className="relative overflow-x-auto sm:rounded-lg">
					<table className="max-w-7xl mx-auto w-full text-sm text-left rtl:text-right text-gray-500 ">
						<caption className="p-5 text-2xl font-semibold text-left rtl:text-right text-gray-900 bg-white  ">
							Booking Status
							<p className="mt-1 text-sm font-normal text-gray-500 ">
								You have this car bookings you can check status here you can
								confirm booking or cancel the bookings
							</p>
						</caption>
						<thead className="text-xs mt-10 text-gray-700 uppercase bg-gray-50  ">
							<tr>
								<th scope="col" className="px-6 py-3">
									Car Type
								</th>
								<th scope="col" className="px-6 py-3">
									Car Image
								</th>
								<th scope="col" className="px-6 py-3">
									Pick Up
								</th>
								<th scope="col" className="px-6 py-3">
									Drop Off
								</th>
								<th scope="col" className="px-6 py-3">
									Drop Off
								</th>
								<th scope="col" className="px-6 py-3">
									Drop Off
								</th>
								<th scope="col" className="px-6 py-3">
									Status
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						{bookingDetails.map((booking, index) => (
							<tbody key={index}>
								<tr className="bg-white border-b">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
										{booking.carType}
									</th>
									<td className="px-6 py-4">
										<Image
											src={booking.carImageUrl}
											alt="car-image"
											height={100}
											width={100}
										/>
									</td>
									<td className="px-6 py-4 capitalize">{booking.pickupCity}</td>
									<td className="px-6 py-4 capitalize">
										{booking.dropoffCity}
									</td>
									<td className="px-6 py-4 capitalize">{booking.pickupDate}</td>
									<td className="px-6 py-4 capitalize">
										{booking.dropoffDate}
									</td>
									<td className="px-6 py-4 text-start capitalize">
										<p className="my-3">{booking.status}</p>{" "}
										<button
											onClick={() =>
												router.push(`/confirm-booking/${booking._id}`)
											}
											className="bg-gray-600 text-white px-2 py-2 w-full rounded-md">
											Confirm Booking
										</button>
									</td>
									<td className="px-6 py-4 capitalize">
										<button
											onClick={() => handleDelete(booking._id)}
											className="bg-gray-600 text-white px-2 py-1 rounded-md">
											{booking.status === "pending" ? "Delete" : "Cancel"}
										</button>
									</td>
								</tr>
							</tbody>
						))}
					</table>
				</div>
			) : (
				<p className="font-bold text-2xl flex flex-col items-center capitalize text-center justify-center h-[80vh]">
					No booking details available.
					<button
						onClick={() => router.push("/")}
						className="bg-gray-600 py-2 px-6 text-white my-2 rounded-md text-lg">
						Book Now
					</button>
				</p>
			)}
		</div>
	);
};

export default BookingStatus;
