"use client";
import React, { useState } from "react";
import SelectInput from "@/components/SelectInput";
import { DatePicker } from "antd";

const Booking = () => {
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

	const carType = [
		{ value: "aston-martin-dbx", label: "Aston Martin DBX" },
		{ value: "audi-q8", label: "Audi Q8" },
		{ value: "audi-rs7", label: "Audi RS7" },
		{ value: "bently-bentayga", label: "Bently Bentayga" },
		{ value: "bently-continental", label: "Bently Continental" },
		{ value: "bugatti-mistral-w16", label: "Bugatti Mistral w16" },
		{ value: "lamborghini-urus", label: "Lamborghini Urus" },
		{ value: "rolls-royce-cullinan", label: "Rolls Royce Cullinan" },
	];

	const [formValues, setFormValues] = useState({
		carType: "",
		pickupCity: "",
		dropoffCity: "",
		pickupDate: "",
		dropoffDate: "",
	});

	const handleSelectChange = (field: any, value: any) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[field]: value,
		}));
	};

	const handleDateChange = (date: any, dateString: any, field: any) => {
		setFormValues((prevValues) => ({
			...prevValues,
			[field]: dateString,
		}));
	};

	const handleSubmit = () => {
		console.log("Form Values:", formValues);
	};

	return (
		<section className="w-full xl:py-28 mx-auto lg:py-20 py-12">
			<div className="mx-auto max-w-7xl capitalize">
				<div className="lg:mb-16 mb-10">
					<h6 className="text-lg text-gray-600 font-medium text-center mb-2 leading-7">
						Book a Car
					</h6>
					<h2 className="lg:text-4xl text-3xl font-manrope text-center font-bold text-gray-900 leading-tight">
						Rent best car with Next Ride
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
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="pickupCity">Pick up</label>
						<SelectInput
							options={cities}
							placeholder="Select a city"
							onChange={(value) => handleSelectChange("pickupCity", value)}
						/>
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="dropoffCity">Drop off</label>
						<SelectInput
							options={cities}
							placeholder="Select a city"
							onChange={(value) => handleSelectChange("dropoffCity", value)}
						/>
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="pickupDate">Pick up date</label>
						<DatePicker
							onChange={(date, dateString) =>
								handleDateChange(date, dateString, "pickupDate")
							}
							className="h-12"
						/>
					</div>
					<div className="flex flex-col p-2 gap-2">
						<label htmlFor="dropoffDate">Drop off date</label>
						<DatePicker
							onChange={(date, dateString) =>
								handleDateChange(date, dateString, "dropoffDate")
							}
							className="h-12"
						/>
					</div>
					<div className="md:col-span-2 md:mx-auto">
						<button
							className="bg-gray-600 text-white px-5 py-2 w-full md:py-3 font-medium capitalize md:mt-5 md:w-72 rounded-md"
							onClick={handleSubmit}>
							Proceed further
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Booking;
