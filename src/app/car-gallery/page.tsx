import React from "react";

const CarGallery = () => {
	return (
		<section className="py-24 ">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
				<div className="grid gap-2.5 lg:pb-16 pb-10">
					<h2 className="w-full text-center text-gray-900 text-4xl font-bold font-manrope leading-normal">
						Our Gallery
					</h2>
					<div className="w-full text-center text-gray-600 text-lg font-normal leading-8">
						Step into the world where every car tells a story.
					</div>
				</div>
				<div className="gallery">
					<div className="flex flex-col mb-10">
						<div className="grid md:grid-cols-12 gap-8 lg:mb-11 mb-7">
							<div className="md:col-span-4 md:h-[404px] h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/7.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-4 md:col-span-6 w-full h-full"
								/>
							</div>
							<div className="md:col-span-8 md:h-[404px] h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/4.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto lg:col-span-8 md:col-span-6 w-full h-full"
								/>
							</div>
						</div>
						<div className="grid md:grid-cols-3 grid-cols-1 gap-8">
							<div className="h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/3.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
								/>
							</div>
							<div className="h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/2.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
								/>
							</div>
							<div className="h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/1.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
								/>
							</div>
							<div className="h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/11.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
								/>
							</div>
							<div className="h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/6.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
								/>
							</div>
							<div className="h-[277px] w-full rounded-3xl">
								<img
									src="/assets/car/10.jpg"
									alt="Gallery image"
									className="gallery-image object-cover rounded-3xl hover:grayscale transition-all duration-700 ease-in-out mx-auto w-full h-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="lightbox" id="lightbox">
				<span className="close" id="close">
					&times;
				</span>
				<img src="" alt="" className="lightbox-image" id="lightbox-image" />
			</div> */}
		</section>
	);
};

export default CarGallery;
