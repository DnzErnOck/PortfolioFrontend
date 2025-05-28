import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL, // Bu satır ile env değişkenini ekliyoruz
  },
  webpack(config) {
    // __dirname yerine, import.meta.url ile dizin yolunu alıyoruz
    const directory = path.dirname(new URL(import.meta.url).pathname);
    config.resolve.alias['@'] = path.resolve(directory); // Alias'ı ekliyoruz
    return config;
  },
};
// console.log("NEXT_PUBLIC_API_URL in browser:", process.env.NEXT_PUBLIC_API_URL);

export default nextConfig;
