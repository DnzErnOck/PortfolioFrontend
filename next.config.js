import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    // __dirname yerine, import.meta.url ile dizin yolunu alıyoruz
    const directory = path.dirname(new URL(import.meta.url).pathname);
    config.resolve.alias['@'] = path.resolve(directory); // Alias'ı ekliyoruz
    return config;
  },
};

export default nextConfig;
