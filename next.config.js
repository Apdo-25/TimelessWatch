/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname:
          process.env.NODE_ENV === "production"
            ? "https://cdn.jsdelivr.net"
            : "http://localhost:3000",
      },
    ],
  },
};

module.exports = nextConfig;
