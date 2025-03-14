import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['encrypted-tbn0.gstatic.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Disable type checking
  },
  async rewrites() {
    return [
      {
        source: '/api/judge0/:path*',
        destination: 'https://judge0-ce.p.rapidapi.com/:path*', // The Judge0 API
      },
      
    ];
  },
};

export default nextConfig;
