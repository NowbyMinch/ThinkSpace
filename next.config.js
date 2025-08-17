/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: { serverActions: {} },
  images: {
    domains: ['ui-avatars.com', 'i.imgur.com'], 

  },
};

module.exports = nextConfig;