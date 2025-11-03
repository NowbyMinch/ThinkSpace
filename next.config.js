/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: { serverActions: {} },
  images: {
    domains: ["ui-avatars.com", "i.imgur.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc**",
      },
    ],
  },
};

module.exports = nextConfig;