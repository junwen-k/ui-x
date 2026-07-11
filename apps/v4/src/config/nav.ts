import type * as PageTree from "fumadocs-core/page-tree";

export const mainNav = [
  {
    title: "Documentation",
    href: "/docs",
  },
  {
    title: "Primitives",
    href: "/docs/primitives",
  },
  {
    title: "Utilities",
    href: "/docs/utilities",
  },
  {
    title: "Components",
    href: "/docs/components",
  },
];

export interface NavItem {
  title: string;
  href: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

function flattenPages(nodes: PageTree.Node[]): NavItem[] {
  const items: NavItem[] = [];

  for (const node of nodes) {
    if (node.type === "page") {
      items.push({ title: String(node.name), href: node.url });
    } else if (node.type === "folder") {
      if (node.index) {
        items.push({ title: String(node.index.name), href: node.index.url });
      }
      items.push(
        ...flattenPages(node.children).filter(
          (item) => item.href !== node.index?.url,
        ),
      );
    }
  }

  return items;
}

/**
 * Derives the docs navigation groups from the fumadocs page tree. Top-level
 * pages form the "Getting Started" group, while each folder becomes its own
 * group, preserving the meta.json ordering.
 */
export function getNavGroups(tree: PageTree.Root): NavGroup[] {
  const pages = tree.children.filter((node) => node.type === "page");
  const folders = tree.children.filter((node) => node.type === "folder");

  return [
    { title: "Getting Started", items: flattenPages(pages) },
    ...folders.map((folder) => ({
      title: String(folder.name),
      items: flattenPages(folder.children),
    })),
  ];
}
