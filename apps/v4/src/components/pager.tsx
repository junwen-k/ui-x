import { findNeighbour } from "fumadocs-core/page-tree";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";

interface DocsPagerProps {
  url: string;
}

export function DocsPager({ url }: DocsPagerProps) {
  const { previous, next } = findNeighbour(source.pageTree, url);
  if (!previous && !next) {
    return null;
  }

  const previousPage = previous && source.getPageByHref(previous.url)?.page;
  const nextPage = next && source.getPageByHref(next.url)?.page;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {previous && (
        <Link
          href={previous.url}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-auto flex-col items-start gap-1.5 p-4 font-normal whitespace-normal",
          )}
        >
          <div className="flex items-center gap-2 font-medium">
            <ChevronLeftIcon />
            {previous.name}
          </div>
          {previousPage?.data.description && (
            <p className="text-muted-foreground line-clamp-1 text-sm">
              {previousPage.data.description}
            </p>
          )}
        </Link>
      )}
      {next && (
        <Link
          href={next.url}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex h-auto flex-col items-end gap-1.5 p-4 whitespace-normal md:col-start-2",
          )}
        >
          <div className="flex items-center gap-2 font-medium">
            {next.name}
            <ChevronRightIcon />
          </div>
          {nextPage?.data.description && (
            <p className="text-muted-foreground line-clamp-1 text-sm">
              {nextPage.data.description}
            </p>
          )}
        </Link>
      )}
    </div>
  );
}
