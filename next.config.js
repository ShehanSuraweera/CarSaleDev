/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eauvrmfsnhwjwnnacyzx.supabase.co",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
