import { defineDocs, defineConfig } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "src/content/docs",
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
