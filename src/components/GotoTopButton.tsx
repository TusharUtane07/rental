"use client";
import React, { useState, useEffect } from "react";
import { IoMdArrowDropupCircle } from "react-icons/io";

const GotoTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.addEventListener("scroll", toggleVisibility);
		return () => {
			window.removeEventListener("scroll", toggleVisibility);
		};
	}, []);

	return (
		<div className="fixed bottom-10 right-10">
			{isVisible && (
				<IoMdArrowDropupCircle
					onClick={scrollToTop}
					size={50}
					className="cursor-pointer text-gray-500"
				/>
			)}
		</div>
	);
};

export default GotoTopButton;
