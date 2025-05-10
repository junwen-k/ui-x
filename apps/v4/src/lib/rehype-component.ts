import fs from "fs";
import path from "path";

import { Root } from "hast";
import type { MdxJsxFlowElementHast } from "mdast-util-mdx-jsx";
import { visit } from "unist-util-visit";

import { createPreCodeElement } from "@/lib/hastscript";

export function rehypeComponent() {
  return async (tree: Root) => {
    visit(tree, "mdxJsxFlowElement", (node: MdxJsxFlowElementHast) => {
      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        if (!name) {
          return "skip";
        }

        try {
          const extension = "tsx";

          // Read the source file.
          const filePath = path.join(
            process.cwd(),
            `src/components/examples/${name}.${extension}`,
          );
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`@/registry/new-york/`, "@/components/");
          source = source.replaceAll("export default", "export");

          node.attributes.push({
            type: "mdxJsxAttribute",
            name: "__rawString__",
            value: source,
          });

          const element = createPreCodeElement(extension, source);

          // Add code as children so that rehype can take over at build time.
          node.children?.push(element);
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        if (!name) {
          return "skip";
        }

        try {
          const extension = "tsx";

          // Read the source file.
          const filePath = path.join(
            process.cwd(),
            `src/registry/new-york/ui/${name}.${extension}`,
          );
          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(`@/registry/new-york/`, "@/components/");
          source = source.replaceAll("export default", "export");

          node.attributes.push({
            type: "mdxJsxAttribute",
            name: "__rawString__",
            value: source,
          });

          const element = createPreCodeElement(extension, source);

          // Add code as children so that rehype can take over at build time.
          node.children?.push(element);
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: MdxJsxFlowElementHast, name: string) {
  return node.attributes?.find(
    (attribute) => "name" in attribute && attribute.name === name,
  );
}
