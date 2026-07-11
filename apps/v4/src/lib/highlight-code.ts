import { createHash } from "crypto";

import { LRUCache } from "lru-cache";
import { codeToHtml } from "shiki";
import type { ShikiTransformer } from "shiki";

// LRU cache for cross-request caching of highlighted code.
// Shiki highlighting is CPU-intensive and deterministic, so caching is safe.
const highlightCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour.
});

export const transformers = [
  {
    code(node) {
      if (node.tagName === "code") {
        const raw = this.source;
        node.properties["__raw__"] = raw;

        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add");
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add");
          node.properties["__bun__"] = raw.replace("npm install", "bun add");
        } else if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create ",
          );
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create ",
          );
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        } else if (raw.startsWith("npm create")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace(
            "npm create",
            "yarn create",
          );
          node.properties["__pnpm__"] = raw.replace(
            "npm create",
            "pnpm create",
          );
          node.properties["__bun__"] = raw.replace("npm create", "bun create");
        } else if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npx", "yarn dlx");
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx");
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun");
        } else if (raw.startsWith("npm run")) {
          node.properties["__npm__"] = raw;
          node.properties["__yarn__"] = raw.replace("npm run", "yarn");
          node.properties["__pnpm__"] = raw.replace("npm run", "pnpm");
          node.properties["__bun__"] = raw.replace("npm run", "bun");
        }
      }
    },
  },
] as ShikiTransformer[];

export async function highlightCode(code: string, language: string = "tsx") {
  const cacheKey = createHash("sha256")
    .update(`${language}:${code}`)
    .digest("hex");

  const cached = highlightCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark-dimmed",
    transformers: [
      {
        pre(node) {
          node.properties["data-slot"] = "code-block-pre";
          node.properties["class"] =
            "my-6 grid max-h-[650px] overflow-auto rounded-xl shadow-[0_1.5px_2px_0_theme(colors.black/32%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/4%)]";
          delete node.properties["style"];
        },
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  });

  highlightCache.set(cacheKey, html);

  return html;
}
