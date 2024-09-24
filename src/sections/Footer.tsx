import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	FaGithub,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaUser,
} from "react-icons/fa6";

const Footer = () => {
	return (
		<>
			<footer className="footer border-t max-w-7xl mx-auto w-full border-b text-base-content p-10">
				<aside>
					<Image src={"/assets/logo.png"} alt="Logo" height={100} width={100} />
					<p>
						<span className="font-medium text-lg">Next Ride</span>
						<br />
						Providing reliable services since 2024
					</p>
				</aside>

				<nav>
					<h6 className="footer-title">Navigation</h6>
					<Link href={"/"} className="link link-hover">
						Home
					</Link>
					<Link href={"/car-models"} className="link link-hover">
						Models
					</Link>
					<Link href={"/booking-status"} className="link link-hover">
						Booking status
					</Link>
					<Link href={"/car-gallery"} className="link link-hover">
						Gallery
					</Link>
				</nav>
				<nav>
					<h6 className="footer-title">Legal</h6>
					<a className="link link-hover">Terms of use</a>
					<a className="link link-hover">Privacy policy</a>
					<a className="link link-hover">Cookie policy</a>
				</nav>
			</footer>
			<div className="my-6 text-lg flex items-center justify-between max-w-7xl mx-auto">
				<p className="text-center">
					All rights reserved &copy;{" "}
					<a target="_blank" href="https://www.tusharutane.com/">
						Tushar Utane
					</a>
				</p>
				<div className="text-2xl flex gap-3">
					<a target="_blank" href="https://www.tusharutane.com/">
						<FaUser />
					</a>
					<a target="_blank" href="https://www.instagram.com/tushar_utane/">
						<FaInstagram />
					</a>
					<a target="_blank" href="https://x.com/tusharutane2">
						<FaTwitter />
					</a>
					<a
						target="_blank"
						href="https://www.linkedin.com/in/tushar-utane-492b00260/">
						<FaLinkedin />
					</a>
					<a target="_blank" href="https://github.com/TusharUtane07/">
						<FaGithub />
					</a>
				</div>
			</div>
		</>
	);
};

export default Footer;
