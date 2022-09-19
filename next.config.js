const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // i18n: {
  //   locales: ['en', 'fr', 'nl'],
  //   defaultLocale: 'fr',
  // },
}

module.exports = nextConfig
