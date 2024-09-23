"use client";
import React, { useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

interface Testimonial {
	stars: number;
	img: string;
	name: string;
	position: string;
	description: string;
}

const testimonials: Testimonial[] = [
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "Tushar U",
		position: "Developer",
		description:
			"Amazing car rental app having great functionality with admin panel.",
	},
	{
		stars: 4,
		img: "/assets/p1.png",
		name: "Amit S",
		position: "Product Manager",
		description:
			"The website is highly responsive and provides a seamless user experience. Well done!",
	},
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "Sara P",
		position: "Designer",
		description:
			"Beautiful design with intuitive UI. The color scheme and layout are on point.",
	},
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "John D",
		position: "CEO",
		description:
			"Excellent execution! The admin panel is powerful yet easy to use. Highly recommended.",
	},
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "Carlo D",
		position: "CEO",
		description:
			"Excellent execution! The admin panel is powerful yet easy to use. Highly recommended.",
	},
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "A Shaikh",
		position: "CEO",
		description:
			"Excellent execution! The admin panel is powerful yet easy to use. Highly recommended.",
	},
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "Stan D",
		position: "CEO",
		description:
			"Excellent execution! The admin panel is powerful yet easy to use. Highly recommended.",
	},
	{
		stars: 5,
		img: "/assets/p1.png",
		name: "Jhon W",
		position: "CEO",
		description:
			"Excellent execution! The admin panel is powerful yet easy to use. Highly recommended.",
	},
];

const Testimonials = () => {
	const [startIndex, setStartIndex] = useState(0);
	const itemsToShow = 4;

	const handleNext = () => {
		setStartIndex(
			(prevIndex) => (prevIndex + itemsToShow) % testimonials.length
		);
	};

	const handlePrevious = () => {
		setStartIndex(
			(prevIndex) =>
				(prevIndex - itemsToShow + testimonials.length) % testimonials.length
		);
	};

	const getVisibleTestimonials = () => {
		let visibleTestimonials = [];
		for (let i = 0; i < itemsToShow; i++) {
			const index = (startIndex + i) % testimonials.length;
			visibleTestimonials.push(testimonials[index]);
		}
		return visibleTestimonials;
	};

	return (
		<section>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h6 className="text-lg text-gray-600 font-medium text-center mb-2 leading-7">
					Reviews
				</h6>
				<h2 className="font-manrope capitalize font-bold text-4xl text-black mb-8 text-center max-lg:text-center">
					Client's Testimonials
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{getVisibleTestimonials().map((item) => (
						<div
							key={item.name}
							className="border border-black/10 p-3 rounded-xl">
							<div className="text-gray-500 flex gap-1 items-center py-3">
								{[...Array(item.stars)].map((_, index) => (
									<BsStarFill key={index} />
								))}
							</div>
							<div className="flex items-center justify-start gap-3 font-extrabold pb-3">
								<img src={item.img} alt="" className="w-10 h-10 rounded-full" />
								<p>{item.name}</p>
							</div>
							<div className="text-sm">
								<p>{item.description}</p>
							</div>
						</div>
					))}
				</div>
				<div className="flex justify-center mt-6 gap-4">
					<button
						className="bg-gray-500 text-white p-3 rounded-md"
						onClick={handlePrevious}>
						<FaArrowLeftLong />
					</button>
					<button
						className="bg-gray-500 text-white p-3 rounded-md"
						onClick={handleNext}>
						<FaArrowRightLong />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
