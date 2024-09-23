"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { usePathname } from "next/navigation";
import axiosInstance from "@/lib/axios";
const Header = () => {
	const [nav, setNav] = useState(false);
	const [userName, setUserName] = useState<string>("");
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

	const getUserDetails = async () => {
		try {
			const response = await axiosInstance.get("/api/user-details/");
			const data = response.data;
			if (data.result) {
				setUserName(data.data.username);
			}
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const signOut = async () => {};

	useEffect(() => {
		getUserDetails();
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 backdrop-blur-2xl shadow-md z-50">
			<div className="flex justify-between items-center h-16 lg:h-20 max-w-[1240px] mx-auto px-4">
				<h1 className="text-3xl font-bold">Next Ride</h1>
				<ul className="hidden md:flex md:items-center">
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
				<div className="font-bold capitalize md:flex hidden">
					{userName && (
						<div className="flex items-center gap-3">
							<p>Hi, {userName}</p>{" "}
							<button className="bg-gray-600 px-3 py-2 text-white rounded-full">
								Logout
							</button>
						</div>
					)}
				</div>
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
				<div className="font-bold capitalize md:hidden flex">
					{userName && (
						<div className="flex items-center flex-col mt-5 gap-3">
							<p>Hi, {userName}</p>{" "}
							<button className="bg-gray-600 px-8 py-2 text-white rounded-full">
								Logout
							</button>
						</div>
					)}
				</div>
			</ul>
		</div>
	);
};

export default Header;
