import React, { useEffect, useState } from "react";
import {
	useStripe,
	useElements,
	PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import Loader from "@/components/Loader";

const CheckoutPage = ({
	amount,
	bookingId,
}: {
	amount: number;
	bookingId: string;
}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [errorMessage, setErrorMessage] = useState<string>();
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);
	const [copyMessage, setCopyMessage] = useState("");

	useEffect(() => {
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [amount]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `http://www.localhost:3000/payment-success?bookingId=${bookingId}&amount=${amount}`,
			},
		});

		if (error) {
			setErrorMessage(error.message);
		}

		setLoading(false);
	};

	const copyNumber = async () => {
		try {
			await navigator.clipboard.writeText("4242 4242 4242 4242");
			setCopyMessage("Card number copied to clipboard!");
			setTimeout(() => setCopyMessage(""), 3000);
		} catch (err) {
			setCopyMessage("Failed to copy!");
		}
	};

	if (!clientSecret || !stripe || !elements) {
		return <Loader />;
	}

	return (
		<form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
			{clientSecret && <PaymentElement />}

			{errorMessage && <div className="mt-3">{errorMessage}</div>}
			{copyMessage && <div className="mt-3 text-green-500">{copyMessage}</div>}
			<div className="capitalize m-6 border-2 border-gray-600 p-4 rounded-xl">
				<p className="text-xl">for testing you can use:</p>
				<div className="border-t my-2 font-medium flex flex-col gap-2 p-3 m-5">
					<p>
						Card Number: 4242 4242 4242 4242
						<button
							type="button"
							onClick={copyNumber}
							className="capitalize px-4 py-1 ml-3 rounded-full bg-gray-600 text-white">
							copy
						</button>
					</p>
					<p>Expiration Date: 03/34 (any future date)</p>
					<p>CVC: 123 (any 3 digits)</p>
				</div>
			</div>
			<button
				disabled={!stripe || loading}
				className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
				{!loading ? `Pay Security Amount $${amount}` : "Processing..."}
			</button>
		</form>
	);
};

export default CheckoutPage;
