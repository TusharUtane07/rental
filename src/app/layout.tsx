import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import GotoTopButton from "@/components/GotoTopButton";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "Next Ride",
	description: "Plan your trip with Next Ride Car Rental",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<head>
				<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header />
				{children}
				<GotoTopButton />
				<Footer />
			</body>
		</html>
	);
}
