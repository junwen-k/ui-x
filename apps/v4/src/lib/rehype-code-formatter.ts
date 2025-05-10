import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import rehypePrettyCode, {
  Options as RehypePrettyCodeOptions,
} from "rehype-pretty-code";
import { MdxOptions } from "velite";

import {
  rehypeRestoreRawCode,
  rehypeStoreRawCode,
} from "@/lib/rehype-code-extractor";
import { rehypeNpmCommand } from "@/lib/rehype-npm-command";

/**
 * Rehype plugin pipeline for code block formatting:
 * 1. Captures and stores the raw code content before any transformations.
 * 2. Processes npm command by adding support for all package managers.
 * 3. Applies syntax highlighting and code annotations via `rehype-pretty-code`.
 * 4. Restores the raw code content so it's available to React components.
 */
export const rehypeCodeFormatter: NonNullable<MdxOptions["rehypePlugins"]> = [
  rehypeStoreRawCode,
  rehypeNpmCommand,
  [
    rehypePrettyCode,
    {
      keepBackground: false,
      transformers: [
        transformerNotationDiff(),
        transformerNotationFocus(),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
      ],
    } satisfies RehypePrettyCodeOptions,
  ],
  rehypeRestoreRawCode,
];
