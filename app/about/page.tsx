import Container from "../components/Container";
import Heading from "../components/Heading";
import Image from "next/image";

const AboutPage = () => {
  return (
    <Container>
      <div className="py-8">
        <Heading title="About Us" center />

        <section className="mt-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <Image
              src="/banner-image.png" // Replace with your image path
              alt="About Us"
              width={500}
              height={300}
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-lg text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-lg text-gray-700">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Our Mission
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Explain your company mission, vision, and values here. This section
            should resonate with your audience and give them insight into what
            drives your company.
          </p>
        </section>
      </div>
    </Container>
  );
};

export default AboutPage;
