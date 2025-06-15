import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { serverActions: {} },
  images: {
    domains: ['ui-avatars.com'],
  },
};

export default nextConfig;
