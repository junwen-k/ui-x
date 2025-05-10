import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function GithubButton() {
  return (
    <Link
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "size-8",
      )}
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
    >
      <SiGithub />
      <span className="sr-only">GitHub</span>
    </Link>
  );
}
