"use client";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function PaymentSuccess({
	searchParams: { bookingId, amount },
}: {
	searchParams: { bookingId: string; amount: number };
}) {
	const router = useRouter();

	const updatePaymentInformation = async () => {
		try {
			const response = await axiosInstance.patch(`/api/book-car/${bookingId}`, {
				status: "confirmed",
			});

			if (response.data.result) {
				toast.success("Payment successfull");
			} else {
				toast.error("errrror occrurrd");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		updatePaymentInformation();
	}, []);

	return (
		<main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-black to-gray-500">
			<div className="my-10">
				<h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
				<h2 className="text-2xl">You successfully sent</h2>

				<p>You will receive further notification on you email</p>

				<div className="bg-white p-2 rounded-md text-gray-500 mt-5 text-4xl font-bold">
					${amount}
				</div>
				<div className="my-10">
					<Link
						href="/booking-status"
						className="rounded-full border border-gray-300 px-3 py-2 ">
						Check Booking Status
					</Link>
				</div>
			</div>
		</main>
	);
}
