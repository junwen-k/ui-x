import type * as PageTree from "fumadocs-core/page-tree";

/**
 * Flattens a page tree folder into its pages, including the folder's index
 * page and pages nested in sub-folders, deduplicated by URL.
 */
export function getPagesFromFolder(folder: PageTree.Folder): PageTree.Item[] {
  const pages: PageTree.Item[] = [];

  if (folder.index) {
    pages.push(folder.index);
  }

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child);
    } else if (child.type === "folder") {
      pages.push(...getPagesFromFolder(child));
    }
  }

  return pages.filter(
    (page, index, all) => all.findIndex((p) => p.url === page.url) === index,
  );
}

/**
 * Top-level pages of the tree (Introduction, Installation, etc.) used as the
 * "Sections" group in the sidebar and mobile nav.
 */
export function getTopLevelSections(tree: PageTree.Root): PageTree.Item[] {
  return tree.children.filter((node) => node.type === "page");
}
