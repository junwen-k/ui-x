import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypePrettyCode from "rehype-pretty-code";
import { z } from "zod";

import { transformers } from "@/lib/highlight-code";

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: "vesper",
            light: "github-light-default",
          },
          transformers,
        },
      ]);

      return plugins;
    },
  },
});

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: z.object({
      title: z.string().max(99),
      description: z.string().max(999).optional(),
      links: z
        .object({
          doc: z.string().optional(),
          api: z.string().optional(),
        })
        .optional(),
    }),
  },
});
