import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsTableOfContents } from "@/components/docs-toc";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";
import { cn } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

interface DocPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function Page({ params }: DocPageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MDX = doc.body;
  const isChangelog = slug?.[0] === "changelog";
  const neighbours = isChangelog
    ? { previous: null, next: null }
    : findNeighbour(source.pageTree, page.url);

  return (
    <div
      data-slot="docs"
      className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="text-foreground mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-4 py-6 md:px-0 lg:py-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">
                {doc.title}
              </h1>
              <div className="docs-nav flex items-center gap-2">
                <div className="ml-auto flex gap-2">
                  {neighbours.previous && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      nativeButton={false}
                      render={
                        <Link href={neighbours.previous.url}>
                          <ArrowLeftIcon />
                          <span className="sr-only">Previous</span>
                        </Link>
                      }
                    />
                  )}
                  {neighbours.next && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="extend-touch-target size-8 shadow-none md:size-7"
                      nativeButton={false}
                      render={
                        <Link href={neighbours.next.url}>
                          <span className="sr-only">Next</span>
                          <ArrowRightIcon />
                        </Link>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
            {doc.description && (
              <p className="text-muted-foreground text-[1.05rem] sm:text-base sm:text-balance md:max-w-[80%]">
                {doc.description}
              </p>
            )}
            {doc.links && (
              <div className="flex items-center space-x-2 pt-2">
                {doc.links?.doc && (
                  <Link
                    href={doc.links.doc}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "gap-1",
                    )}
                  >
                    Docs
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                )}
                {doc.links?.api && (
                  <Link
                    href={doc.links.api}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      badgeVariants({ variant: "secondary" }),
                      "gap-1",
                    )}
                  >
                    API Reference
                    <ExternalLinkIcon className="size-3" />
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="typeset w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
            <MDX components={mdxComponents} />
          </div>
          <div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0">
            {neighbours.previous && (
              <Button
                variant="secondary"
                size="sm"
                className="shadow-none"
                nativeButton={false}
                render={
                  <Link href={neighbours.previous.url}>
                    <ArrowLeftIcon /> {neighbours.previous.name}
                  </Link>
                }
              />
            )}
            {neighbours.next && (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto shadow-none"
                nativeButton={false}
                render={
                  <Link href={neighbours.next.url}>
                    {neighbours.next.name} <ArrowRightIcon />
                  </Link>
                }
              />
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0" />
        {doc.toc?.length ? (
          <div className="scroll-fade flex scrollbar-none flex-col gap-8 overflow-y-auto px-8">
            <DocsTableOfContents toc={doc.toc} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) {
    return {};
  }

  const doc = page.data;

  return {
    metadataBase: new URL(siteConfig.url),
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: page.url,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  };
}

export function generateStaticParams() {
  return source.generateParams();
}
