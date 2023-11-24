/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        domain: "images.unsplash.com",
        path: "/photo-:id",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
