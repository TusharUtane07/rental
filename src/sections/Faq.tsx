"use client";
import { useState } from "react";

const faqData = [
	{
		question: "1. What is special about comparing rental car deals?",
		answer:
			"Comparing rental car deals is important as it helps find the best deal that fits your budget and requirements, ensuring you get the most value for your money. By comparing various options, you can find deals that offer lower prices, additional services, or better car models. You can find car rental deals by researching online and comparing prices from different rental companies.",
	},
	{
		question: "2. How do I find the car rental deals?",
		answer:
			"You can find car rental deals by researching online and comparing prices from different rental companies. Websites such as Expedia, Kayak, and Travelocity allow you to compare prices and view available rental options. It is also recommended to sign up for email newsletters and follow rental car companies on social media to be informed of any special deals or promotions.",
	},
	{
		question: "3. How do I find such low rental car prices?",
		answer:
			"Book in advance: Booking your rental car ahead of time can often result in lower prices. Compare prices from multiple companies: Use websites like Kayak, Expedia, or Travelocity to compare prices from multiple rental car companies. Look for discount codes and coupons: Search for discount codes and coupons that you can use to lower the rental price. Renting from an off-airport location can sometimes result in lower prices.",
	},
];

const Faq = () => {
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	const toggleAccordion = (index: number) => {
		setActiveIndex(activeIndex === index ? null : index);
	};
	return (
		<section className="w-full xl:py-28 lg:py-20 py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="lg:mb-16 mb-10">
					<h6 className="text-lg text-gray-600 font-medium text-center mb-2 leading-7">
						FAQs
					</h6>
					<h2 className="lg:text-4xl text-3xl font-manrope text-center font-bold text-gray-900 leading-tight">
						Frequently Asked Questions
					</h2>
				</div>
				<div className="accordion-group w-full max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto">
					{faqData.map((item, index) => (
						<div
							key={index}
							className={`accordion p-6 border-b border-solid ${
								activeIndex === index
									? "bg-gray-50 border-transparent"
									: "border-gray-200"
							} transition-all duration-500 active:rounded-xl`}>
							<button
								className="accordion-toggle group inline-flex items-center justify-between text-lg text-gray-900 font-medium leading-7 w-full transition duration-500 text-left lg:text-lg hover:text-gray-900"
								onClick={() => toggleAccordion(index)}
								aria-expanded={activeIndex === index}
								aria-controls={`faq-${index}`}>
								<h5>{item.question}</h5>
								<svg
									className={`transform transition-transform duration-500 ${
										activeIndex === index ? "rotate-180" : ""
									}`}
									width={24}
									height={24}
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M6 15L10.5858 10.4142C11.2525 9.74755 11.5858 9.41421 12 9.41421C12.4142 9.41421 12.7475 9.74755 13.4142 10.4142L18 15"
										stroke="currentColor"
										strokeWidth="1.6"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							<div
								id={`faq-${index}`}
								className={`accordion-content w-full px-0 overflow-hidden transition-[height] duration-300 pr-4 mt-3 ${
									activeIndex === index ? "block" : "hidden"
								}`}>
								<p className="text-base text-gray-600 leading-6">
									{item.answer}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Faq;
