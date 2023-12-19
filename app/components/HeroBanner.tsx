import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="banner relative bg-gradient-to-r from-gray-500 to-gray-700 mb-8 border-[1.2px] rounded-md">
      <div className="container mx-auto px-4 lg:px-8 py-12 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
            Timeless Watch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white mb-4 sm:mb-6">
            Discover elegance and craftsmanship with our exclusive range of
            luxury watches. Designed for sophistication and durability.
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 relative mb-8 md:mb-0">
          <Image
            src="/banner-image.png"
            fill
            alt="Elegant Watch"
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
