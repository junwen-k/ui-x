import { llms } from "fumadocs-core/source";

import { siteConfig } from "@/config/site";
import { source } from "@/lib/source";

export const revalidate = false;

export function GET() {
  const index = llms(source).index();

  return new Response(index.replaceAll(/\]\(\//g, `](${siteConfig.url}/`));
}
