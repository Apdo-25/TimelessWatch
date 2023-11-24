import Image from "next/image";

const HeroBanner = () => {
  return (
    <div className="banner relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8 border-[1.2px] rounded-md">
      <div className="container mx-auto px-4 lg:px-8 py-12 flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Timeless Watch
          </h1>
          <p className="text-lg md:text-xl text-white mb-6">
            Discover elegance and craftsmanship with our exclusive range of
            luxury watches. Designed for sophistication and durability.
          </p>
          <button className="bg-white text-sky-500 hover:bg-sky-700 hover:text-white py-2 px-6 rounded transition duration-300 ease-in-out">
            Shop Now
          </button>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 relative aspect-square md:aspect-video mb-8 md:mb-0">
          <Image
            src="/banner-image.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            alt="Elegant Watch"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
