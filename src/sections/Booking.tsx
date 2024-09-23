"use client";
import React, { useEffect, useState } from "react";
import SelectInput from "@/components/SelectInput";
import { DatePicker } from "antd";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";

interface FormValues {
	carType: string;
	pickupCity: string;
	dropoffCity: string;
	pickupDate: string;
	dropoffDate: string;
}

interface Errors {
	carType?: string;
	pickupCity?: string;
	dropoffCity?: string;
	pickupDate?: string;
	dropoffDate?: string;
}

const Booking = () => {
	const router = useRouter();

	const [userId, setUserId] = useState<string>("");

	const carImages: Record<string, string> = {
		"Aston Martin DBX":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072060/frnu9hvpodxwamzzwl5l.jpg",
		"Audi Q8":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072061/qxvpcqi1dusybpvra75e.jpg",
		"Audi RS7":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072061/aqrzhewmsdatdqmrtlgf.jpg",
		"Bently Bentayga":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072061/vh7sx3pa9szj7bwmzgyu.jpg",
		"Bently Continental":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072061/crjfnskrwd7pwotnzgxv.jpg",
		"Bugatti Mistral w16":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072061/ac4yczgrblnimvmegbpr.jpg",
		"Lamborghini Urus":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072062/ixaydgsav1acm7tfkect.jpg",
		"Rolls Royce Cullinan":
			"https://res.cloudinary.com/dx8spprgu/image/upload/v1727072062/upkt549qod2aoknpdqch.jpg",
	};

	const cities = [
		{ value: "mumbai", label: "Mumbai" },
		{ value: "pune", label: "Pune" },
		{ value: "bangalore", label: "Bangalore" },
		{ value: "delhi", label: "Delhi" },
		{ value: "hyderabad", label: "Hyderabad" },
		{ value: "chennai", label: "Chennai" },
		{ value: "ahmedabad", label: "Ahmedabad" },
		{ value: "kolkata", label: "Kolkata" },
	];

	const carType = Object.keys(carImages).map((car) => ({
		value: car,
		label: car,
	}));

	const [formValues, setFormValues] = useState<FormValues>({
		carType: "",
		pickupCity: "",
		dropoffCity: "",
		pickupDate: "",
		dropoffDate: "",
	});

	const [errors, setErrors] = useState<Errors>({});

	const handleSelectChange = (field: keyof FormValues, value: string) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[field]: value,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			[field]: "",
		}));
	};

	const handleDateChange = (
		date: any,
		dateString: string,
		field: keyof FormValues
	) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[field]: dateString,
		}));
		setErrors((prevErrors) => ({
			...prevErrors,
			[field]: "",
		}));
	};

	const validateForm = () => {
		let isValid = true;
		let newErrors: Errors = {};

		if (!formValues.carType) {
			newErrors.carType = "Car type is required";
			isValid = false;
		}
		if (!formValues.pickupCity) {
			newErrors.pickupCity = "Pickup city is required";
			isValid = false;
		}
		if (!formValues.dropoffCity) {
			newErrors.dropoffCity = "Dropoff city is required";
			isValid = false;
		}
		if (!formValues.pickupDate) {
			newErrors.pickupDate = "Pickup date is required";
			isValid = false;
		}
		if (!formValues.dropoffDate) {
			newErrors.dropoffDate = "Dropoff date is required";
			isValid = false;
		}
		if (formValues.pickupDate && formValues.dropoffDate) {
			if (new Date(formValues.pickupDate) >= new Date(formValues.dropoffDate)) {
				newErrors.dropoffDate = "Dropoff date must be later than pickup date";
				isValid = false;
			}
		}

		setErrors(newErrors);
		return isValid;
	};

	const getUserDetails = async () => {
		try {
			const response = await axiosInstance.get("/api/user-details/");
			const data = response.data;
			if (data.result) {
				setUserId(data.data._id);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};
	console.log(userId);
	useEffect(() => {
		getUserDetails();
	}, [userId]);

	const handleSubmit = async () => {
		if (userId?.length > 1) {
			if (validateForm()) {
				const selectedCarType = formValues.carType;
				const carImageUrl = carImages[selectedCarType];
				try {
					const response = await axiosInstance.post("/api/book-car/", {
						carType: formValues.carType,
						pickupCity: formValues.pickupCity,
						dropoffCity: formValues.dropoffCity,
						pickupDate: formValues.pickupDate,
						dropoffDate: formValues.dropoffDate,
						carImageUrl: carImageUrl,
						status: "pending",
						userId,
					});

					if (response.data.result) {
						toast.success("Booking details added, proceeding further");
						router.push("/booking-status");
						setFormValues({
							carType: "",
							pickupCity: "",
							dropoffCity: "",
							pickupDate: "",
							dropoffDate: "",
						});
					} else {
						toast.error("Error booking car. Please try again.");
					}
				} catch (error) {
					toast.error("An unexpected error occurred. Please try again.");
					console.error("Error booking car:", error);
				}
			}
		} else {
			toast.error("Please login before Booking");
			router.push("/login");
		}
	};

	return (
		<section className="w-full xl:py-28 mx-auto lg:py-20 py-12">
			<div className="mx-auto max-w-7xl">
				<div className="lg:mb-16 mb-10">
					<h6 className="text-lg text-gray-600 font-medium text-center mb-2 leading-7">
						Book a Car
					</h6>
					<h2 className="lg:text-4xl text-3xl font-manrope text-center font-bold text-gray-900 leading-tight">
						Rent the best car with Next Ride
					</h2>
				</div>
				<div className="grid grid-cols-1 justify-center md:grid-cols-2 border border-black py-16 px-8 gap-4 mx-3 sm:mx-12 rounded-md shadow-2xl">
					<div className="flex flex-col p-2 gap-2 md:col-span-2">
						<label htmlFor="carType">Select your car type</label>
						<SelectInput
							options={carType}
							placeholder="Select a car type"
							onChange={(value) => handleSelectChange("carType", value)}
						/>
						{errors.carType && (
							<small className="text-red-500">{errors.carType}</small>
						)}
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="pickupCity">Pick up</label>
						<SelectInput
							options={cities}
							placeholder="Select a city"
							onChange={(value) => handleSelectChange("pickupCity", value)}
						/>
						{errors.pickupCity && (
							<small className="text-red-500">{errors.pickupCity}</small>
						)}
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="dropoffCity">Drop off</label>
						<SelectInput
							options={cities}
							placeholder="Select a city"
							onChange={(value) => handleSelectChange("dropoffCity", value)}
						/>
						{errors.dropoffCity && (
							<small className="text-red-500">{errors.dropoffCity}</small>
						)}
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="pickupDate">Pick up date</label>
						<DatePicker
							onChange={(date, dateString) =>
								handleDateChange(date, String(dateString), "pickupDate")
							}
							placeholder="Select date"
							className="w-full h-12"
						/>
						{errors.pickupDate && (
							<small className="text-red-500">{errors.pickupDate}</small>
						)}
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="dropoffDate">Drop off date</label>
						<DatePicker
							onChange={(date, dateString) =>
								handleDateChange(date, String(dateString), "dropoffDate")
							}
							placeholder="Select date"
							className="w-full h-12"
						/>
						{errors.dropoffDate && (
							<small className="text-red-500">{errors.dropoffDate}</small>
						)}
					</div>
					<div className="flex flex-col p-2 gap-2 md:col-span-2">
						<button
							onClick={handleSubmit}
							className="bg-gray-600 hover:bg-gray-700 text-white py-2 lg:py-4 rounded-md transition duration-200">
							Book Now
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Booking;
