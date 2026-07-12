"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import type * as PageTree from "fumadocs-core/page-tree";
import { useDocsSearch } from "fumadocs-core/search/client";
import { ArrowRightIcon, CornerDownLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { copyToClipboard } from "@/components/copy-button";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { useMutationObserver } from "@/hooks/use-mutation-observer";
import { REGISTRY_NAMES } from "@/lib/docs";
import { getPagesFromFolder } from "@/lib/page-tree";
import { cn } from "@/lib/utils";

export function CommandMenu({
  tree,
  navItems,
  ...props
}: React.ComponentProps<typeof Button> & {
  tree: PageTree.Root;
  navItems?: readonly { href: string; label: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [renderDelayedGroups, setRenderDelayedGroups] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<
    "page" | "component" | null
  >(null);
  const [copyPayload, setCopyPayload] = React.useState("");

  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
  });

  const searchTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearchChange = React.useCallback(
    (value: string) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        React.startTransition(() => {
          setSearch(value);
        });
      }, 500);
    },
    [setSearch],
  );

  // Defer rendering of the large page groups until the dialog has painted.
  React.useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        setRenderDelayedGroups(true);
      });

      return () => {
        cancelAnimationFrame(frame);
      };
    }

    setRenderDelayedGroups(false);
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  const commandFilter = React.useCallback(
    (value: string, searchValue: string, keywords?: string[]) => {
      const extendValue = value + " " + (keywords?.join(" ") || "");
      if (extendValue.toLowerCase().includes(searchValue.toLowerCase())) {
        return 1;
      }
      return 0;
    },
    [],
  );

  const handlePageHighlight = React.useCallback(
    (item: { url: string; name?: React.ReactNode }) => {
      const componentName = item.url.split("/").pop() ?? "";

      if (REGISTRY_NAMES.has(componentName)) {
        setSelectedType("component");
        setCopyPayload(
          `npx shadcn@latest add ${siteConfig.url}/r/${componentName}.json`,
        );
      } else {
        setSelectedType("page");
        setCopyPayload("");
      }
    },
    [setSelectedType, setCopyPayload],
  );

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  const navItemsSection = React.useMemo(() => {
    if (!navItems || navItems.length === 0) {
      return null;
    }

    return (
      <CommandGroup
        heading="Pages"
        className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
      >
        {navItems.map((item) => (
          <CommandMenuItem
            key={item.href}
            value={`Navigation ${item.label}`}
            keywords={["nav", "navigation", item.label.toLowerCase()]}
            onHighlight={() => {
              setSelectedType("page");
              setCopyPayload("");
            }}
            onSelect={() => {
              runCommand(() => router.push(item.href));
            }}
          >
            <ArrowRightIcon />
            {item.label}
          </CommandMenuItem>
        ))}
      </CommandGroup>
    );
  }, [navItems, runCommand, router]);

  const pageGroupsSection = React.useMemo(() => {
    return tree.children.map((group) => {
      if (group.type !== "folder") {
        return null;
      }

      const pages = getPagesFromFolder(group);

      if (pages.length === 0) {
        return null;
      }

      return (
        <CommandGroup
          key={group.$id}
          heading={group.name}
          className="p-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
        >
          {pages.map((item) => {
            const isComponent =
              item.url.includes("/components/") ||
              item.url.includes("/primitives/") ||
              item.url.includes("/utilities/");

            return (
              <CommandMenuItem
                key={item.url}
                value={
                  item.name?.toString() ? `${group.name} ${item.name}` : ""
                }
                keywords={isComponent ? ["component"] : undefined}
                onHighlight={() => handlePageHighlight(item)}
                onSelect={() => {
                  runCommand(() => router.push(item.url));
                }}
              >
                {isComponent ? (
                  <div className="aspect-square size-4 rounded-full border border-dashed border-muted-foreground" />
                ) : (
                  <ArrowRightIcon />
                )}
                {item.name}
              </CommandMenuItem>
            );
          })}
        </CommandGroup>
      );
    });
  }, [tree.children, handlePageHighlight, runCommand, router]);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }

      if (e.key === "c" && (e.metaKey || e.ctrlKey) && copyPayload) {
        runCommand(() => {
          copyToClipboard(copyPayload);
        });
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [copyPayload, runCommand]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "relative h-8 w-full justify-start rounded-lg border-none bg-muted pl-3 text-foreground shadow-none transition-colors hover:bg-muted/50 md:w-48 lg:w-40 xl:w-64 dark:bg-card",
            )}
            {...props}
          >
            <span className="hidden xl:inline-flex">
              Search documentation...
            </span>
            <span className="inline-flex xl:hidden">Search...</span>
          </Button>
        }
      />
      <CommandMenuDialogContent className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800">
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command
          className="rounded-none bg-transparent **:data-[slot=command-input]:h-9! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50"
          filter={commandFilter}
        >
          <div className="relative">
            <CommandInput
              placeholder="Search documentation..."
              onValueChange={handleSearchChange}
            />
            {query.isLoading && (
              <div className="pointer-events-none absolute top-1/2 right-3 z-10 flex -translate-y-1/2 items-center justify-center">
                <Icons.spinner className="size-4 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty className="py-12 text-center text-sm text-muted-foreground">
              {query.isLoading ? "Searching..." : "No results found."}
            </CommandEmpty>
            {navItemsSection}
            {renderDelayedGroups ? (
              <>
                {pageGroupsSection}
                <SearchResults setOpen={setOpen} query={query} search={search} />
              </>
            ) : null}
          </CommandList>
        </Command>
        <div className="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium text-muted-foreground dark:border-t-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <CornerDownLeftIcon />
            </CommandMenuKbd>{" "}
            {selectedType === "page" || selectedType === "component"
              ? "Go to Page"
              : null}
          </div>
          {copyPayload && (
            <>
              <Separator orientation="vertical" className="h-4!" />
              <div className="flex items-center gap-1">
                <CommandMenuKbd>⌘</CommandMenuKbd>
                <CommandMenuKbd>C</CommandMenuKbd>
                {copyPayload}
              </div>
            </>
          )}
        </div>
      </CommandMenuDialogContent>
    </Dialog>
  );
}

function CommandMenuItem({
  children,
  className,
  onHighlight,
  ...props
}: React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void;
  "data-selected"?: string;
  "aria-selected"?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  useMutationObserver(ref, (mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "aria-selected" &&
        ref.current?.getAttribute("aria-selected") === "true"
      ) {
        onHighlight?.();
      }
    });
  });

  return (
    <CommandItem
      ref={ref}
      className={cn(
        "h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-input data-[selected=true]:bg-input/50",
        className,
      )}
      {...props}
    >
      {children}
    </CommandItem>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 items-center justify-center gap-1 rounded border bg-background px-1 font-sans text-[0.7rem] font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}

type Query = ReturnType<typeof useDocsSearch>["query"];

function SearchResults({
  setOpen,
  query,
  search,
}: {
  setOpen: (open: boolean) => void;
  query: Query;
  search: string;
}) {
  const router = useRouter();

  const uniqueResults = React.useMemo(() => {
    if (!query.data || !Array.isArray(query.data)) {
      return [];
    }

    return query.data.filter(
      (item, index, self) =>
        !(
          item.type === "text" && item.content.trim().split(/\s+/).length <= 1
        ) && index === self.findIndex((t) => t.content === item.content),
    );
  }, [query.data]);

  if (!search.trim()) {
    return null;
  }

  if (!query.data || query.data === "empty") {
    return null;
  }

  if (query.data && uniqueResults.length === 0) {
    return null;
  }

  return (
    <CommandGroup
      className="px-0! **:[[cmdk-group-heading]]:scroll-mt-16 **:[[cmdk-group-heading]]:p-3! **:[[cmdk-group-heading]]:pb-1!"
      heading="Search Results"
    >
      {uniqueResults.map((item) => {
        return (
          <CommandItem
            key={item.id}
            data-type={item.type}
            onSelect={() => {
              router.push(item.url);
              setOpen(false);
            }}
            className="h-9 rounded-md border border-transparent px-3! font-normal data-[selected=true]:border-input data-[selected=true]:bg-input/50"
            keywords={[item.content]}
            value={`${item.content} ${item.type}`}
          >
            <div className="line-clamp-1 text-sm">{item.content}</div>
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

// Local dialog content without a backdrop, anchored near the top like the
// shadcn command palette.
function CommandMenuDialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  return (
    <DialogPortal>
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 fixed top-[15%] left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 gap-4 bg-background duration-100 outline-none sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  );
}
