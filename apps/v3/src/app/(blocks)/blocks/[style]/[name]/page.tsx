import { Metadata } from "next"
import { notFound } from "next/navigation"

import { siteConfig } from "@/config/site"
import { getAllBlockIds, getBlock } from "@/lib/blocks"
import { cn } from "@/lib/utils"
import { BlockChunk } from "@/components/block-chunk"
import { BlockWrapper } from "@/components/block-wrapper"
// import { ThemesStyle } from "@/components/themes-styles"
import { Style, styles } from "@/registry/registry-styles"

import "@/styles/mdx.css"

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    style: Style["name"]
    name: string
  }>
}): Promise<Metadata> {
  const { name, style } = await params
  const block = await getBlock(name, style)

  if (!block) {
    return {}
  }

  return {
    title: block.name,
    description: block.description,
    openGraph: {
      title: block.name,
      description: block.description,
      type: "article",
      url: `/blocks/${block.name}`,
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
      title: block.name,
      description: block.description,
      images: [siteConfig.ogImage],
      creator: "@shadcn",
    },
  }
}

export async function generateStaticParams() {
  const blockIds = await getAllBlockIds()
  return styles
    .map((style) =>
      blockIds.map((name) => ({
        style: style.name,
        name,
      }))
    )
    .flat()
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{
    style: Style["name"]
    name: string
  }>
}) {
  const { name, style } = await params
  const block = await getBlock(name, style)

  if (!block) {
    return notFound()
  }

  const Component = block.component

  const chunks = block.chunks?.map((chunk) => ({ ...chunk }))
  delete block.component
  block.chunks?.map((chunk) => delete chunk.component)

  return (
    <>
      {/* <ThemesStyle /> */}
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={cn(
          "themes-wrapper bg-background",
          block.container?.className
        )}
      >
        <BlockWrapper block={block}>
          <Component />
          {chunks?.map((chunk, index) => (
            <BlockChunk
              key={chunk.name}
              block={block}
              chunk={block.chunks?.[index]}
            >
              <chunk.component />
            </BlockChunk>
          ))}
        </BlockWrapper>
      </div>
    </>
  )
}
