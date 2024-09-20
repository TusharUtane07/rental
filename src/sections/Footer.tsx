import Image from "next/image";
import React from "react";

const Footer = () => {
	return (
		<footer className="footer max-w-7xl mx-auto w-full text-base-content p-10">
			<aside>
				<Image src={"/assets/logo.png"} alt="Logo" height={100} width={100} />
				<p>
					<span className="font-medium text-lg">Next Ride</span>
					<br />
					Providing reliable services since 2024
				</p>
			</aside>
			<nav>
				<h6 className="footer-title">Services</h6>
				<a className="link link-hover">Branding</a>
				<a className="link link-hover">Design</a>
				<a className="link link-hover">Marketing</a>
				<a className="link link-hover">Advertisement</a>
			</nav>
			<nav>
				<h6 className="footer-title">Company</h6>
				<a className="link link-hover">About us</a>
				<a className="link link-hover">Contact</a>
				<a className="link link-hover">Jobs</a>
				<a className="link link-hover">Press kit</a>
			</nav>
			<nav>
				<h6 className="footer-title">Legal</h6>
				<a className="link link-hover">Terms of use</a>
				<a className="link link-hover">Privacy policy</a>
				<a className="link link-hover">Cookie policy</a>
			</nav>
		</footer>
	);
};

export default Footer;
