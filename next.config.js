/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);  // Alias'ı ekliyoruz
    return config;
  },
};

export default nextConfig;
