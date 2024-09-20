import Image from "next/image";
import React from "react";

const logosGrid = [
	{
		id: 1,
		image: "/assets/car-brands/1.png",
	},
	{
		id: 2,
		image: "/assets/car-brands/2.png",
	},
	{
		id: 3,
		image: "/assets/car-brands/3.png",
	},
	{
		id: 4,
		image: "/assets/car-brands/4.png",
	},
	{
		id: 5,
		image: "/assets/car-brands/5.png",
	},
	{
		id: 6,
		image: "/assets/car-brands/6.png",
	},
	{
		id: 7,
		image: "/assets/car-brands/7.png",
	},
	{
		id: 8,
		image: "/assets/car-brands/8.png",
	},
];

const LogoCard = () => {
	return (
		<section className="py-24 ">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-20 text-center">
					<span className="text-gray-600 text-center font-medium mb-4 block">
						Our Brands
					</span>
					<h1 className="text-4xl text-gray-900 text-center font-bold">
						We work with the best brands
					</h1>
				</div>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2  xl:grid-cols-4">
					{logosGrid.map((item) => {
						return (
							<div className="flex justify-center items-center border border-solid border-gray-200 shadow-sm h-24 rounded-2xl">
								<Image
									src={item.image}
									alt="Brand logo"
									height={200}
									width={200}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default LogoCard;
