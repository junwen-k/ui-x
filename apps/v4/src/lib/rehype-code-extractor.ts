import { Element, ElementData, Root, Text } from "hast";
import { visit } from "unist-util-visit";

function cleanTransformAnnotations(source: string) {
  return (
    source
      // Remove single-line annotations.
      .replace(/\/\/\s*\[!code[^\n]*\]\s*\n/g, "")
      // Remove inline annotations.
      .replace(/\[!code[^\]]*\]/g, "")
      .trim()
  );
}

export interface NodeWithDataRawString extends Element {
  data: ElementData & {
    __rawString__?: string;
  };
}

export function rehypeStoreRawCode() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node?.tagName === "pre") {
        const codeElement = node.children.at(-1);
        if (codeElement?.type !== "element" || codeElement.tagName !== "code") {
          return "skip";
        }

        // Store raw code content in node.data before transformation.
        const rawCode = cleanTransformAnnotations(
          (codeElement.children[0] as Text).value,
        );

        (codeElement as NodeWithDataRawString).data = {
          ...(codeElement as NodeWithDataRawString).data,
          __rawString__: rawCode,
        };
      }
    });
  };
}

export function rehypeRestoreRawCode() {
  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (node?.tagName === "figure") {
        if (!("data-rehype-pretty-code-figure" in node.properties)) {
          return "skip";
        }

        const preElement = node.children.at(-1);
        if (preElement?.type !== "element" || preElement.tagName !== "pre") {
          return "skip";
        }

        const codeElement = preElement.children.at(-1);
        if (codeElement?.type !== "element" || codeElement.tagName !== "code") {
          return "skip";
        }

        // Restore raw code from node.data to pre element properties
        // This makes it accessible to React components after transformation.
        preElement.properties["__rawString__"] = (
          codeElement as NodeWithDataRawString
        ).data?.__rawString__;
      }
    });
  };
}
