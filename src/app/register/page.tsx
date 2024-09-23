"use client";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface RegisterFormData {
	username: string;
	email: string;
	password: string;
}

const Register = () => {
	const [formData, setFormData] = useState<RegisterFormData>({
		username: "",
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
		setErrors({ ...errors, [name]: "" });
	};

	const validateForm = (): boolean => {
		let valid = true;
		let newErrors: Partial<RegisterFormData> = {};

		if (!formData.username) {
			newErrors.username = "Username is required.";
			valid = false;
		}
		if (!formData.email) {
			newErrors.email = "Email is required.";
			valid = false;
		}
		if (!formData.password) {
			newErrors.password = "Password is required.";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const registerUser = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (!validateForm()) {
			setLoading(false);
			return;
		}

		try {
			const response = await axiosInstance.post("/api/register/", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});

			const data = await response.data;

			if (data.result) {
				toast.success("Registered successfully!");
				router.push("/login");
			}
		} catch (error: any) {
			if (error.response && error.response.data) {
				toast.error(error.response.data.message || "An error occurred.");
			} else {
				toast.error("User creation failed.");
			}
		} finally {
			setLoading(false);
		}
	};

	const getUserDetails = async () => {
		try {
			const response = await axiosInstance.get("/api/user-details/");
			const data = response.data;
			if (data.result) {
				router.push("/");
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getUserDetails();
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-5 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
					Create your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form onSubmit={registerUser}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-5 text-gray-700">
								Username
							</label>
							<div className="mt-1">
								<input
									id="username"
									name="username"
									type="text"
									value={formData.username}
									onChange={handleInputChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-gray focus:border-gray-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
								{errors.username && (
									<p className="text-red-600 text-sm p-2">{errors.username}</p>
								)}
							</div>
						</div>

						<div className="mt-6">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-5 text-gray-700">
								Email address
							</label>
							<div className="mt-1">
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-gray focus:border-gray-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
								{errors.email && (
									<p className="text-red-600 text-sm p-2">{errors.email}</p>
								)}
							</div>
						</div>

						<div className="mt-6">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-5 text-gray-700">
								Password
							</label>
							<div className="mt-1">
								<input
									id="password"
									name="password"
									type="password"
									value={formData.password}
									onChange={handleInputChange}
									className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-gray focus:border-gray-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
								/>
								{errors.password && (
									<p className="text-red-600 text-sm p-2">{errors.password}</p>
								)}
							</div>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-500 focus:outline-none focus:border-gray-700 focus:shadow-outline-gray active:bg-gray-700 transition duration-150 ease-in-out ${
									loading ? "opacity-50 cursor-not-allowed" : ""
								}`}
								disabled={loading}>
								{loading ? "Registering..." : "Register"}
							</button>
						</div>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Already have an account?{" "}
							<Link href="/login">
								<span className="font-medium text-gray-600 hover:text-gray-500">
									Login
								</span>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
