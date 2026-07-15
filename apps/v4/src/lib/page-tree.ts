import type * as PageTree from "fumadocs-core/page-tree";
import type * as React from "react";

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

export interface FolderSection {
  name?: React.ReactNode;
  pages: PageTree.Item[];
}

/**
 * A folder's own pages — its index page plus its direct page children — split
 * into sections at separator entries (`---Label---` in meta.json). The first
 * section is unnamed and holds the pages before any separator. Nested folders
 * (e.g. a component with framework-specific sub-pages like bprogress/next)
 * contribute only their index page, not their descendants — those sub-pages
 * are only reachable via linked cards on that index page, matching
 * shadcn/ui's dark-mode-style sub-pages.
 */
export function getOwnSectionsFromFolder(
  folder: PageTree.Folder,
): FolderSection[] {
  const sections: FolderSection[] = [{ pages: [] }];
  const seen = new Set<string>();

  const push = (page: PageTree.Item) => {
    if (seen.has(page.url)) {
      return;
    }
    seen.add(page.url);
    sections[sections.length - 1].pages.push(page);
  };

  if (folder.index) {
    push(folder.index);
  }

  for (const child of folder.children) {
    if (child.type === "separator") {
      sections.push({ name: child.name, pages: [] });
    } else if (child.type === "page") {
      push(child);
    } else if (child.type === "folder" && child.index) {
      push(child.index);
    }
  }

  return sections.filter((section) => section.pages.length > 0);
}

/**
 * Top-level pages of the tree (Introduction, Installation, etc.) used as the
 * "Sections" group in the sidebar and mobile nav.
 */
export function getTopLevelSections(tree: PageTree.Root): PageTree.Item[] {
  return tree.children.filter((node) => node.type === "page");
}
