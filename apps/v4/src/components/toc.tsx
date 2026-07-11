"use client";

import { AlignLeft } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface TocEntry {
  title?: React.ReactNode;
  url: string;
  depth: number;
}

interface TocProps {
  toc: TocEntry[];
}

function getIdFromUrl(url: string) {
  return url.split("#")[1];
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc
        .map((item) => item.url)
        .filter(Boolean)
        .map(getIdFromUrl),
    [toc],
  );

  const activeHeadings = useActiveItem(itemIds);

  if (!toc?.length) {
    return null;
  }

  return (
    <div className="grid gap-2">
      <div className="flex items-center text-sm font-medium">
        <AlignLeft className="mr-2 size-4" />
        On This Page
      </div>
      <ul className="m-0 list-none">
        {toc.map((item) => {
          const isActive = activeHeadings.includes(getIdFromUrl(item.url));

          return (
            <li
              key={item.url}
              className={cn(
                "mt-0 pt-1.5",
                item.depth === 3 && "pl-4",
                item.depth >= 4 && "pl-8",
              )}
            >
              <a
                href={item.url}
                className={cn(
                  "hover:text-foreground inline-block text-sm no-underline transition-colors",
                  isActive && "text-foreground font-medium",
                  !isActive && "text-muted-foreground",
                )}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function useActiveItem(itemIds: string[]) {
  const [activeIds, setActiveIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    let visible: string[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !visible.includes(entry.target.id)) {
            visible = [...visible, entry.target.id];
          } else if (
            !entry.isIntersecting &&
            visible.includes(entry.target.id)
          ) {
            visible = visible.filter((v) => v !== entry.target.id);
          }
        }

        if (visible.length > 0) setActiveIds(visible);
      },
      {
        rootMargin: `-80px 0% -70% 0%`,
        threshold: 1,
      },
    );

    function onScroll(): void {
      const element = document.scrollingElement;
      if (!element) return;

      if (element.scrollTop === 0) {
        setActiveIds(itemIds.slice(0, 1));
      } else if (
        element.scrollTop + element.clientHeight >=
        element.scrollHeight - 6
      ) {
        setActiveIds(itemIds.slice(-1));
      }
    }

    itemIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [itemIds]);

  return activeIds;
}
