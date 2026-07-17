import Link from "next/link";
import * as React from "react";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/config/site";

export function GitHubLink() {
  return (
    <Button
      size="sm"
      variant="ghost"
      className="h-8 shadow-none"
      nativeButton={false}
      render={
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <Icons.gitHub />
          <React.Suspense fallback={<Skeleton className="h-4 w-[42px]" />}>
            <StarsCount />
          </React.Suspense>
        </Link>
      }
    />
  );
}

async function StarsCount() {
  const data = await fetch("https://api.github.com/repos/junwen-k/ui-x", {
    next: { revalidate: 86400 }, // Cache for 1 day.
  });
  const json = await data.json();
  const stars = json.stargazers_count ?? 0;

  return (
    <span className="text-muted-foreground w-fit text-xs tabular-nums">
      {stars >= 1000 ? `${Math.round(stars / 1000)}k` : stars.toLocaleString()}
    </span>
  );
}
