"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/sections/Footer";
import Header from "@/sections/Header";
import GotoTopButton from "@/components/GotoTopButton";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" data-theme="light">
			<head>
				<title>Next Ride | Car Rental</title>
				<link rel="shortcut icon" href="favicon.png" type="image/x-icon" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased lg:pt-20 pt-16`}>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Header />
						{children}
						<GotoTopButton />
						<Toaster />
						<Footer />
					</PersistGate>
				</Provider>
			</body>
		</html>
	);
}
