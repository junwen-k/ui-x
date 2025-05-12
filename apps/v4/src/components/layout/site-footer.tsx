import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-dashed md:px-8">
      <div className="mx-auto max-w-screen-2xl border-x border-dashed px-4 py-3">
        <div className="text-muted-foreground text-center text-sm leading-loose text-balance md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.githubProfile}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            junwen-k
          </a>{" "}
          based on{" "}
          <a
            href={siteConfig.links.githubShadcnUi}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            shadcn-ui
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
