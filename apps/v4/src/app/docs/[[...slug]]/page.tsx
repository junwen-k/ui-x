import { ExternalLinkIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsPager } from "@/components/pager";
import { DashboardTableOfContents } from "@/components/toc";
import { badgeVariants } from "@/components/ui/badge";
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

  return (
    <div className="mx-auto grid items-start gap-12 p-4 md:p-8 lg:grid-cols-7 lg:p-12">
      <div className="lg:col-span-5">
        <div className="grid gap-2.5">
          <h1 className="text-3xl font-bold tracking-tight">{doc.title}</h1>
          <p className="text-muted-foreground text-pretty">{doc.description}</p>
          {doc.links && (
            <div className="flex items-center space-x-2 pt-4">
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
        <div className="pt-8 pb-12">
          <MDX components={mdxComponents} />
        </div>
        <DocsPager url={page.url} />
      </div>
      <div className="sticky top-28 hidden lg:col-span-2 lg:block">
        <DashboardTableOfContents toc={doc.toc} />
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
