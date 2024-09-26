"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutPage from "@/sections/CheckOutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

const Checkout = ({ params }: any) => {
	const bookingId = params.checkoutId;

	if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
		throw new Error("Next public stripe key is undefined");
	}

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
	const amount = 230;

	const router = useRouter();
	const confirmPayment = async () => {
		try {
			const response = await axiosInstance.patch(`/api/book-car/${bookingId}`, {
				status: "confirmed",
			});

			if (response.data.result) {
				toast.success("Payment successfull");
				router.push("/booking-status");
			} else {
				toast.error("Error occurred");
			}
		} catch (error: any) {
			toast.error("Error occurred");
		}
	};

	return (
		<div className="mt-40 lg:mx-[400px] mx-3 md:mx-20 md:mb-20">
			<div>Facing some issue in payment method, it will be fixed soon</div>
			<button
				onClick={confirmPayment}
				className="bg-gray-600 text-white px-5 py-2 my-3 rounded-md">
				Confirm Booking without Payment
			</button>
			{/* {
				<Elements
					stripe={stripePromise}
					options={{
						mode: "payment",
						amount: convertToSubcurrency(amount),
						currency: "usd",
					}}>
					<CheckOutPage amount={amount} bookingId={bookingId} />
				</Elements>
			} */}
		</div>
	);
};

export default Checkout;
