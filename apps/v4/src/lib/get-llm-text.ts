import { source } from "@/lib/source";

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  const processed = (await page.data.getText("processed")).trim();

  return `# ${page.data.title} (${page.url})\n\n${processed}`;
}
