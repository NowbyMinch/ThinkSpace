/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: { serverActions: {} },
  images: {
    domains: ['ui-avatars.com'],
  },
};

module.exports = nextConfig;