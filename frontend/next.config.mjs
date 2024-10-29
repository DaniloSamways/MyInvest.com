/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "investidor10.com.br",
      },
    ],
  },
};

export default nextConfig;
