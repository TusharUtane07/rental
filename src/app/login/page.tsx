"use client";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "@/redux/authSlice";

interface LogInFormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const [formData, setFormData] = useState<LogInFormData>({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<Partial<LogInFormData>>({});

	const router = useRouter();
	const dispatch = useDispatch();

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
		let newErrors: Partial<LogInFormData> = {};

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

	const LoginInUser = async (e: FormEvent) => {
		e.preventDefault();
		setLoading(true);

		if (!validateForm()) {
			setLoading(false);
			return;
		}

		try {
			const response = await axiosInstance.post("/api/login/", {
				email: formData.email,
				password: formData.password,
			});

			const data = await response.data;

			if (data.result) {
				toast.success("Logged in successfully!");
				dispatch(signIn());
				router.push("/");
			}
		} catch (error: any) {
			if (error.response && error.response.data) {
				toast.error(error.response.data.message || "An error occurred.");
			} else {
				toast.error("User login failed.");
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
				<h2 className="text-center text-3xl leading-9 font-extrabold text-gray-900">
					Login to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<form onSubmit={LoginInUser}>
						<div>
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
								{loading ? "logging in..." : "Login"}
							</button>
						</div>
					</form>

					<div className="mt-6 text-center">
						<p className="text-sm text-gray-600">
							Don't have an account?{" "}
							<Link href="/register">
								<span className="font-medium text-gray-600 hover:text-gray-500">
									Create your account
								</span>
							</Link>
						</p>
						<Link href={"/"} className="text-sm my-2 font-medium text-gray-600">
							Go Back to Home{" "}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
