import type { NextConfig } from "next";

const isStaticBuild = process.env.BUILD_STATIC === "true";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isStaticBuild && {
    output: "export",
    generateBuildId: async () => {
      return "static-build";
    },
  }),
};

export default nextConfig;
