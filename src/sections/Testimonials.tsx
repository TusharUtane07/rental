import React from "react";

import { BsStarFill } from "react-icons/bs";

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
];

const Testimonials = () => {
	return (
		<section className="">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<h6 className="text-lg text-orange-600 font-medium text-center mb-2 leading-7">
					Reviews
				</h6>
				<h2 className="font-manrope capitalize font-bold text-4xl text-black mb-8 text-center max-lg:text-center">
					Client's Testimonials
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{testimonials.map((item) => {
						return (
							<div
								key={item.name}
								className="border border-black/10 p-3 rounded-xl">
								<div className="text-orange-500 flex gap-1 items-center py-3">
									<BsStarFill />
									<BsStarFill />
									<BsStarFill />
									<BsStarFill />
									<BsStarFill />
								</div>
								<div className="flex items-center justify-start gap-3 font-extrabold pb-3">
									<img
										src={item.img}
										alt=""
										className="w-10 h-10 rounded-full"
									/>
									<p>{item.name}</p>
								</div>
								<div className="text-sm">
									<p>{item.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
