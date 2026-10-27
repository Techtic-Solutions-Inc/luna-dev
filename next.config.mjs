/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  rewrites: async () => ({
    beforeFiles: [
      {
        source: "/api/:path*",
        destination: process.env.LUNA_VALIDATION_API_PROXY_TARGET || "http://127.0.0.1:3000/:path*",
      },
    ],
  }),
};

export default nextConfig;
