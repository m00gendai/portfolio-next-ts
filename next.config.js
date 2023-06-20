/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.mrweber.ch',
        port: '',
        pathname: '/storage/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
