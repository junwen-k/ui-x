import { Element, ElementData, Root } from "hast";
import convert from "npm-to-yarn";
import { visit } from "unist-util-visit";

import { PackageManager, packageManagers } from "@/hooks/use-package-manager";
import { createPreCodeElement } from "@/lib/hastscript";
import { NodeWithDataRawString } from "@/lib/rehype-code-extractor";

interface NodeWithDataProcessed extends Element {
  data: ElementData & {
    __processed__?: boolean;
  };
}

interface CommandBlock {
  packageManager: PackageManager;
  command: string;
  element: ReturnType<typeof createPreCodeElement>;
}

function createCommandBlock(
  rawNpmCommand: string,
  packageManager: PackageManager,
): CommandBlock {
  const command = convert(rawNpmCommand, packageManager);
  const element = createPreCodeElement("bash", command);

  const codeElement = element.children.at(-1);
  if (codeElement?.type === "element" && codeElement.tagName === "code") {
    (codeElement as NodeWithDataRawString).data = {
      ...codeElement.data,
      __rawString__: command,
    };
  }

  // Mark as processed to prevent infinite loops.
  (element as NodeWithDataProcessed).data = {
    ...(element as NodeWithDataProcessed).data,
    __processed__: true,
  };

  return {
    packageManager,
    command,
    element,
  };
}

export function rehypeNpmCommand() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (
        node?.tagName !== "pre" ||
        (node as NodeWithDataProcessed).data?.__processed__
      ) {
        return "skip";
      }

      const codeElement = node.children.at(-1);
      if (codeElement?.type !== "element" || codeElement.tagName !== "code") {
        return "skip";
      }

      const rawCode = (codeElement as NodeWithDataRawString).data
        ?.__rawString__;
      if (!rawCode?.startsWith("npm ") && !rawCode?.startsWith("npx ")) {
        return "skip";
      }

      const commands = packageManagers.map((pm) =>
        createCommandBlock(rawCode, pm),
      );

      Object.assign(node, {
        type: "mdxJsxFlowElement",
        name: "CodeBlockCommand",
        attributes: [
          {
            type: "mdxJsxAttribute",
            name: "commands",
            value: JSON.stringify(
              commands.map(({ packageManager, command }) => ({
                packageManager,
                command,
              })),
            ),
          },
        ],
        children: commands.map(({ element }) => element),
      });
    });
  };
}
