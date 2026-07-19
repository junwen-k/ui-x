import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = source.getPages().map((page) => ({
    url: `${siteConfig.url}${page.url}`,
    changeFrequency: "weekly" as const,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
    },
    ...docs,
  ];
}
