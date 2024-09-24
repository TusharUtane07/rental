"use client";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutPage from "@/sections/CheckOutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const Checkout = ({ params }: any) => {
	const bookingId = params.checkoutId;

	if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
		throw new Error("Next public stripe key is undefined");
	}

	const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
	const amount = 230;
	return (
		<div className="mt-40 mx-96">
			{
				<Elements
					stripe={stripePromise}
					options={{
						mode: "payment",
						amount: convertToSubcurrency(amount),
						currency: "usd",
					}}>
					<CheckOutPage amount={amount} bookingId={bookingId} />
				</Elements>
			}
		</div>
	);
};

export default Checkout;
