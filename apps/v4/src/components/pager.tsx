import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { Doc } from "@/.velite";
import { docs } from "@/.velite";
import { buttonVariants } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

interface NavItem {
  readonly title: string;
  readonly href?: string;
  readonly disabled?: boolean;
  readonly items?: readonly NavItem[];
}

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc);
  if (!pager) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {pager?.prev?.href && (
        <Link
          href={pager.prev.href}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-auto flex-col items-start gap-1.5 p-4 font-normal whitespace-normal",
          )}
        >
          <div className="flex items-center gap-2 font-medium">
            <ChevronLeftIcon />
            {pager.prev.title}
          </div>
          <p className="text-muted-foreground line-clamp-1 text-sm">
            {pager.prev.doc?.description}
          </p>
        </Link>
      )}
      {pager?.next?.href && (
        <Link
          href={pager.next.href}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-auto flex-col items-end gap-1.5 p-4 whitespace-normal md:col-start-2",
          )}
        >
          <div className="flex items-center gap-2 font-medium">
            {pager.next.title}
            <ChevronRightIcon />
          </div>
          {pager.next.doc?.description && (
            <p className="text-muted-foreground line-clamp-1 text-sm">
              {pager.next.doc.description}
            </p>
          )}
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  const nav = docsConfig.sidebarNav;

  const flattenedLinks = [null, ...flatten(nav), null];

  const activeIndex = flattenedLinks.findIndex(
    (link) => `/${doc.slug}` === link?.href,
  );

  const nextLink = flattenedLinks[activeIndex + 1];

  const prevLink = flattenedLinks[activeIndex - 1];

  const prev =
    activeIndex !== 0
      ? {
          ...prevLink,
          doc: docs.find((doc) => `/${doc.slug}` === prevLink?.href),
        }
      : null;

  const next =
    activeIndex !== flattenedLinks.length - 1
      ? {
          ...nextLink,
          doc: docs.find((doc) => `/${doc.slug}` === nextLink?.href),
        }
      : null;

  return {
    prev,
    next,
  };
}

export function flatten(links: readonly NavItem[]): readonly NavItem[] {
  return links
    .reduce<
      readonly NavItem[]
    >((flat, link) => flat.concat(link.items?.length ? flatten(link.items) : link), [])
    .filter((link) => !link?.disabled);
}
