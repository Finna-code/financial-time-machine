import type { NextConfig } from "next";

const nextConfig = {
  // ADD THIS 👇
  eslint: {
    ignoreDuringBuilds: true,
  },

  // if other config exists, leave it
};

export default nextConfig;
