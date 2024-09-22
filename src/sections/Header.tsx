"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { usePathname } from "next/navigation";
const Header = () => {
	const [nav, setNav] = useState(false);
	const handleNav = () => {
		setNav(!nav);
	};

	const pathname = usePathname();

	const navItems = [
		{ id: 1, text: "Home", link: "/" },
		{ id: 2, text: "Gallery", link: "/car-gallery" },
		{ id: 3, text: "Models", link: "/car-models" },
		{ id: 4, text: "About", link: "/about" },
		{ id: 5, text: "Contact", link: "/contact" },
	];

	return (
		<div className="fixed top-0 left-0 right-0 backdrop-blur-2xl shadow-md z-50">
			<div className="flex justify-between items-center h-16 lg:h-20 max-w-[1240px] mx-auto px-4">
				<h1 className="text-3xl font-bold">Next Ride</h1>
				<ul className="hidden md:flex">
					{navItems.map((item) => (
						<Link
							href={item.link}
							key={item.id}
							className={`p-4 rounded-xl m-2 cursor-pointer duration-300 
                                ${
																	pathname === item.link
																		? "font-bold text-black"
																		: "hover:text-black"
																}`}>
							{item.text}
						</Link>
					))}
				</ul>
				<div onClick={handleNav} className="block md:hidden">
					{nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
				</div>
			</div>
			{/* Mobile Navbar */}
			<ul
				className={
					nav
						? "fixed md:hidden left-0 top-0 p-5 w-[60%] h-screen border-r border-gray-600/30  bg-white z-50 ease-in-out duration-500"
						: "ease-in-out w-[60%] duration-500 h-screen  bg-white fixed top-0 bottom-0 left-[-100%]"
				}>
				{navItems.map((item) => (
					<Link
						href={item.link}
						key={item.id}
						onClick={() => setNav(!nav)}
						className={`p-4 rounded-xl flex duration-300 
                            ${
															pathname === item.link
																? "font-bold text-black"
																: "hover:text-black cursor-pointer"
														}`}>
						{item.text}
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Header;
