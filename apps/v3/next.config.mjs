import { createContentlayerPlugin } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/combobox-primitive",
        permanent: false,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/combobox-primitive",
        permanent: false,
      },
      {
        source: "/r/icons/:path*",
        destination: "https://ui.shadcn.com/r/icons/:path*",
        permanent: true,
      },
    ]
  },
}

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
