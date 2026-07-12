export const siteConfig = {
  name: "junwen-k/ui-x",
  url: "https://ui-x.junwen-k.dev",
  ogImage: "https://ui-x.junwen-k.dev/og.jpg",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  links: {
    github: "https://github.com/junwen-k/ui-x",
    githubProfile: "https://github.com/junwen-k",
    githubShadcnUi: "https://github.com/shadcn-ui/ui",
  },
  navItems: [
    {
      href: "/docs",
      label: "Docs",
    },
    {
      href: "/docs/primitives",
      label: "Primitives",
    },
    {
      href: "/docs/utilities",
      label: "Utilities",
    },
    {
      href: "/docs/components",
      label: "Components",
    },
  ],
} as const;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
} as const;
