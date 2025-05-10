import rehypeAutolinkHeadings, {
  Options as AutolinkHeadingsOptions,
} from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import { defineCollection, defineConfig, s } from "velite";

import { rehypeCodeFormatter } from "@/lib/rehype-code-formatter";
import { rehypeComponent } from "@/lib/rehype-component";

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const docs = defineCollection({
  name: "Doc",
  pattern: "docs/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      badge: s.string().optional(),
      links: s
        .object({
          doc: s.string().optional(),
          api: s.string().optional(),
        })
        .optional(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

export default defineConfig({
  root: "src/content",
  collections: {
    docs,
  },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypeComponent,
      ...rehypeCodeFormatter,
      [
        rehypeAutolinkHeadings,
        {
          // behavior: "wrap",
        } satisfies AutolinkHeadingsOptions,
      ],
    ],
  },
});
