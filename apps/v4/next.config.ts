import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedEnv: true,
  },
  async redirects() {
    return [
      {
        source: "/docs/primitives",
        destination: "/docs/primitives/date-time-field",
        permanent: false,
      },
      {
        source: "/docs/utilities",
        destination: "/docs/utilities/sortable",
        permanent: false,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/badge-group",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/docs/:path*.md",
        destination: "/llms.mdx/docs/:path*",
      },
    ];
  },
};

export default withMDX(nextConfig);
