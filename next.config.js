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
  i18n: {
    locales: ["de_CH"],
    defaultLocale: "de_CH",
  }
}

module.exports = nextConfig
