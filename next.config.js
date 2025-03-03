/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin", // or "unsafe-none" if needed
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp", // Needed for shared resources
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin", // Allow resources from different origins
          },
        ],
      },
    ];
  },
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
