/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.midjourney.com','firebasestorage.googleapis.com'],
  },
}

module.exports = nextConfig
