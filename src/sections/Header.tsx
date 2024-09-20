"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

const Header = () => {
	const [nav, setNav] = useState(false);
	const handleNav = () => {
		setNav(!nav);
	};

	const navItems = [
		{ id: 1, text: "Home", link: "/" },
		{ id: 2, text: "Gallery", link: "/car-gallery" },
		{ id: 3, text: "Models", link: "/car-models" },
		{ id: 4, text: "About", link: "/about" },
		{ id: 5, text: "Contact", link: "/contact" },
	];

	return (
		<div className=" flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4">
			<h1 className="w-full text-3xl font-bold">Next Ride</h1>
			<ul className="hidden md:flex">
				{navItems.map((item) => (
					<Link
						href={item.link}
						key={item.id}
						className="p-4 rounded-xl m-2 cursor-pointer duration-300 hover:text-black">
						{item.text}
					</Link>
				))}
			</ul>
			<div onClick={handleNav} className="block md:hidden">
				{nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
			</div>
			<ul
				className={
					nav
						? "fixed md:hidden left-0 top-0 w-[60%] h-full  bg-white z-20  ease-in-out duration-500"
						: "ease-in-out w-[60%] duration-500 bg-white  fixed top-0 bottom-0 left-[-100%]"
				}>
				<h1 className="w-full text-3xl font-bold m-4">Next Ride</h1>
				{navItems.map((item) => (
					<Link
						href={item.link}
						key={item.id}
						className="p-4 rounded-xl flex duration-300 hover:text-black cursor-pointer ">
						{item.text}
					</Link>
				))}
			</ul>
		</div>
	);
};

export default Header;
