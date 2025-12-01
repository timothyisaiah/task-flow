import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Skip generating static pages for dynamic routes during export
  ...(process.env.BUILD_STATIC === 'true' && {
    output: 'export',
    // Exclude dynamic routes from static generation
    generateBuildId: async () => {
      return 'static-build'
    },
  }),
};

export default nextConfig;
