import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedEnv: true,
  },
  async redirects() {
    return [
      {
        source: "/docs/primitives",
        destination: "/docs/primitives/combobox",
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
};

export default nextConfig;
