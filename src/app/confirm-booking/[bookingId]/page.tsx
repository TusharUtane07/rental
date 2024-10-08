"use client";
import Loader from "@/components/Loader";
import axiosInstance from "@/lib/axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiFillInfoCircle } from "react-icons/ai";

interface BookingDetails {
	status: string;
	pickupCity: string;
	dropoffCity: string;
	pickupDate: string;
	dropoffDate: string;
	carType: string;
	carImageUrl: string;
}

interface ConfirmedBookingDetails {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	age: string;
	city: string;
	address: string;
	email: string;
	pinCode: string;
}

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
	const [userId, setUserId] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const [confirmedDetails, setConfimedDetails] =
		useState<ConfirmedBookingDetails | null>(null);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		age: "",
		email: "",
		address: "",
		city: "",
		pinCode: "",
	});

	const [formErrors, setFormErrors] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
		age: "",
		email: "",
		address: "",
		city: "",
		pinCode: "",
	});

	const bookingId = params?.bookingId;
	const router = useRouter();

	const getBookingDetails = async () => {
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
				setError(null);
			} else {
				setError("Error fetching booking details");
			}
		} catch (err) {
			setError("An error occurred while fetching booking details");
		} finally {
			setLoading(false);
		}
	};

	const getUserDetails = async () => {
		try {
			const response = await axiosInstance.get("/api/user-details/");
			const data = response.data;
			if (data.result) {
				setUserId(data.data._id);
				setUserName(data.data.username);
			} else {
				setUserId("");
			}
		} catch (error) {
			setUserId("");
		} finally {
			setLoading(false);
		}
	};

	const getConfirmedDetails = async () => {
		try {
			const response = await axiosInstance.get(
				`/api/client-details/${bookingId}`
			);
			if (response.data.result) {
				setConfimedDetails(response.data.data);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		if (!loading && !userId) {
			toast.error("Please Login First");
			router.push("/login");
		}
	}, [loading, userId, router]);

	useEffect(() => {
		getUserDetails();
	}, []);

	useEffect(() => {
		if (userId) {
			getBookingDetails();
			getConfirmedDetails();
		}
	}, [userId]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	const validateForm = () => {
		const errors: Partial<typeof formErrors> = {};
		let valid = true;

		Object.keys(formData).forEach((field) => {
			if (!formData[field as keyof typeof formData]) {
				errors[field as keyof typeof formErrors] = `${field.replace(
					/([A-Z])/g,
					" $1"
				)} is required`;
				valid = false;
			}
		});

		setFormErrors((prevErrors) => ({ ...prevErrors, ...errors }));
		return valid;
	};

	const handleCheckout = async () => {
		if (!validateForm()) {
			toast.error("Please fill out all required fields.");
			return;
		}
		try {
			const respone = await axiosInstance.post("/api/client-details/", {
				firstName: formData.firstName,
				lastName: formData.lastName,
				phoneNumber: formData.phoneNumber,
				age: formData.age,
				email: formData.email,
				address: formData.address,
				pinCode: formData.pinCode,
				city: formData.city,
				userId,
				bookingId,
			});

			if (respone.data.result) {
				router.push(`/checkout/${bookingId}`);
			} else {
				toast.error("Some error occurred");
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const cancelBooking = async () => {
		try {
			if (!bookingId) {
				toast.error("Server Error Occurred");
				return;
			}

			const response = await axiosInstance.delete(`/api/book-car/${bookingId}`);

			if (response.data.result) {
				toast.success("Booking cancelled");
				router.push("/booking-status");
			} else {
				toast.error("Error Occurred");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};
	console.log(confirmedDetails);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return (
			<p className="flex justify-center text-3xl py-3 h-[60vh] mt-20 ">
				{error}
			</p>
		);
	}

	if (!bookingDetails) {
		return <Loader />;
	}

	return (
		<section className="py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h1 className="bg-gray-600 text-white p-3">Confirm Ride</h1>
				<div className="bg-gray-200 p-3 rounded-md mt-2">
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
											Username
										</th>
										<td className="px-6 py-4">{userName}</td>
									</tr>
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
						{confirmedDetails ? (
							<div className="relative overflow-x-auto">
								<table className=" w-full  mt-10 text-sm text-left rtl:text-right text-gray-500">
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
												First Name
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.firstName || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												Last Name
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.lastName || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												Phone Number
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.phoneNumber || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												Age
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.age || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												Email
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.email || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												City
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.city || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												Address
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.address || "N/A"}
											</td>
										</tr>
										<tr className="bg-white border-b">
											<th
												scope="row"
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
												Pin Code
											</th>
											<td className="px-6 py-4">
												{confirmedDetails.pinCode || "N/A"}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						) : (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:my-5 md:p-6">
								{Object.keys(formData).map((field) => (
									<div key={field} className="flex flex-col gap-2 capitalize">
										<label htmlFor={field}>{field}</label>
										<input
											type={field === "age" ? "number" : "text"}
											id={field}
											className="form-input p-2 border rounded-md"
											value={formData[field as keyof typeof formData]}
											onChange={handleInputChange}
										/>
										{formErrors[field as keyof typeof formErrors] && (
											<p className="text-red-500 text-sm">
												{formErrors[field as keyof typeof formErrors]}
											</p>
										)}
									</div>
								))}
							</div>
						)}
					</div>
				</div>
				<button
					className="text-center font-bold uppercase w-full md:w-auto text-white rounded-md p-2 md:px-5 text-md bg-gray-600"
					onClick={
						bookingDetails.status === "pending" ? handleCheckout : cancelBooking
					}>
					{bookingDetails.status === "pending" ? "Checkout" : "Cancel Booking"}
				</button>
			</div>
		</section>
	);
};

export default ConfirmBooking;
