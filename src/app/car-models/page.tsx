import { carData } from "@/data/car-models";
import React from "react";

const CarModels: React.FC = () => {
	return (
		<section className="py-24 ">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
				<div className="grid gap-2.5 lg:pb-16 pb-10">
					<h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
						Our Car Models
					</h2>
					<div className="w-full text-center text-gray-600 text-lg font-normal leading-8">
						Step into the world where every car tells a story.
					</div>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
					{carData.map((car, index) => (
						<div
							key={index}
							className="border rounded-lg shadow-lg p-3 overflow-hidden">
							<img
								loading="lazy"
								src={car.image}
								alt={`${car.make} ${car.model}`}
								className="w-full rounded-lg h-96 object-cover"
							/>
							<div className="p-4">
								<h2 className="text-xl font-semibold">{`${car.make} ${car.model}`}</h2>
								<p className="text-gray-600">{car.year}</p>
								<p className="mt-2">{car.description}</p>
								<p className="mt-2 font-bold">{`On-Road Price: ${car.on_road_price}`}</p>
								<h3 className="mt-4 font-semibold">Engine Details:</h3>
								<p>{`Type: ${car.engine.type}`}</p>
								<p>{`Horsepower: ${car.engine.horsepower} hp`}</p>
								<p>{`Torque: ${car.engine.torque}`}</p>
								<p>{`Transmission: ${car.engine.transmission}`}</p>
								<h3 className="mt-4 font-semibold">Features:</h3>
								<ul className="list-disc list-inside">
									{car.features.map((feature, i) => (
										<li key={i}>{feature}</li>
									))}
								</ul>
								<p className="mt-2 font-bold">{`Target Audience: ${car.target_audience}`}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default CarModels;
