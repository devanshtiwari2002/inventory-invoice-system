/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.cache = false; // Disable Webpack cache to reduce memory usage
    return config;
  },
};

export default nextConfig;
