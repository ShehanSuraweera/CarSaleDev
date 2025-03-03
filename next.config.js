/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eauvrmfsnhwjwnnacyzx.supabase.co",
        port: "",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**", // Allows all local images
      },
      {
        protocol: "https",
        hostname: "car-sale-dev.vercel.app",
        pathname: "/**", // Allows all local images
      },
      {
        protocol: "https",
        hostname: "https://wandilk.vercel.app",
        pathname: "/**", // Allows all local images
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
