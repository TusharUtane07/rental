import Booking from "@/sections/Booking";
import ContactButton from "@/sections/ContactButton";
import Faq from "@/sections/Faq";
import Hero from "@/sections/Hero";
import LogoCard from "@/sections/LogoCard";
import Testimonials from "@/sections/Testimonials";

export default function Home() {
	return (
		<div>
			<Hero />
			<Booking />
			<LogoCard />
			<Testimonials />
			<Faq />
			<ContactButton />
		</div>
	);
}
