import React from "react";

const About = () => {
	return (
		<div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
			<div className="flex flex-col lg:flex-row justify-between gap-8">
				<div className="w-full lg:w-5/12 flex flex-col justify-center">
					<h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
						About Us
					</h1>
					<p className="font-normal text-base leading-6 text-gray-600 ">
						At Next Ride Car Rental Services, we are passionate about providing
						exceptional mobility solutions tailored to your unique needs.
						Founded on the principle of convenience and customer satisfaction,
						we aim to revolutionize the car rental experience. Our mission is to
						offer a seamless and efficient service that allows you to focus on
						what truly matters—your journey. With a diverse fleet ranging from
						economy vehicles to luxury rides, we cater to all occasions, whether
						it&apos;s a spontaneous weekend trip or a well-planned business
						travel itinerary. We prioritize safety and reliability, ensuring
						that every vehicle in our fleet is thoroughly inspected and
						maintained to the highest standards.
					</p>
				</div>
				<div className="w-full lg:w-8/12 ">
					<img
						className="w-full h-full"
						src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
						alt="A group of People"
					/>
				</div>
			</div>

			<div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
				<div className="w-full lg:w-5/12 flex flex-col justify-center">
					<h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
						Our Story
					</h1>
					<p className="font-normal text-base leading-6 text-gray-600 ">
						Welcome to Next Ride, where we redefine the car rental experience.
						Our journey began with a simple idea: to make car rental accessible,
						convenient, and enjoyable for everyone. We believe that a great
						rental experience should start from the moment you browse our app.
						It is a long-established fact that a user is captivated by an
						engaging layout and seamless functionality. Our user-friendly
						interface is designed to guide you effortlessly through the booking
						process. At Next Ride, we pride ourselves on offering a diverse
						fleet of vehicles, ensuring that you find the perfect match for your
						needs—be it for a weekend getaway, a business trip, or a special
						occasion.
					</p>
				</div>
				<div className="w-full lg:w-8/12 lg:pt-8">
					<div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
						<div className="p-4 pb-6 flex justify-center flex-col items-center">
							<img
								className="md:block hidden"
								src="https://i.ibb.co/FYTKDG6/Rectangle-118-2.png"
								alt="Alexa featured Img"
							/>
							<img
								className="md:hidden block"
								src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
								alt="Alexa featured Img"
							/>
							<p className="font-medium text-xl leading-5 text-gray-800 mt-4">
								Alexa
							</p>
						</div>
						<div className="p-4 pb-6 flex justify-center flex-col items-center">
							<img
								className="md:block hidden"
								src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
								alt="Olivia featured Img"
							/>
							<img
								className="md:hidden block"
								src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
								alt="Olivia featured Img"
							/>
							<p className="font-medium text-xl leading-5 text-gray-800 mt-4">
								Olivia
							</p>
						</div>
						<div className="p-4 pb-6 flex justify-center flex-col items-center">
							<img
								className="md:block hidden"
								src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
								alt="Liam featued Img"
							/>
							<img
								className="md:hidden block"
								src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
								alt="Liam featued Img"
							/>
							<p className="font-medium text-xl leading-5 text-gray-800 mt-4">
								Liam
							</p>
						</div>
						<div className="p-4 pb-6 flex justify-center flex-col items-center">
							<img
								className="md:block hidden"
								src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
								alt="Elijah featured img"
							/>
							<img
								className="md:hidden block"
								src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
								alt="Elijah featured img"
							/>
							<p className="font-medium text-xl leading-5 text-gray-800 mt-4">
								Elijah
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
