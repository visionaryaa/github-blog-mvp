/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure static export for Vercel
  output: 'export',
  // Add image domains if needed for your blog
  images: {
    domains: ['github.com'],
  },
};

module.exports = nextConfig;