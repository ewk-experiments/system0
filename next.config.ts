import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/system0',
  images: { unoptimized: true },
};

export default nextConfig;
