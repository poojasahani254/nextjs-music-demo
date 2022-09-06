// /** @type {import('next').NextConfig} */
// const nextEnv = require('next-env')
// const dotenvLoad = require('dotenv-load')
//
// dotenvLoad()
//
// const withNextEnv = nextEnv()

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
