export const siteConfig = {
  name: "junwen-k/ui-x",
  url: "https://ui-x.junwen-k.dev",
  ogImage: "https://ui-x.junwen-k.dev/og.jpg",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  links: {
    github: "https://github.com/junwen-k",
    githubUiX: "https://github.com/junwen-k/ui-x",
    githubShadcnUi: "https://github.com/shadcn-ui/ui",
  },
} as const

export type SiteConfig = typeof siteConfig
