import { Octokit } from "@octokit/core";
import { Star } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const fetchWithRevalidate = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, {
    ...init,
    next: { revalidate: 60 * 60 * 24 }, // 24 hours - GitHub stars count doesn't need frequent updates
  });

const octokit = new Octokit({
  request: {
    fetch: fetchWithRevalidate,
  },
});

function getGitHubRepoInfo(url: string) {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error("Invalid GitHub URL");
  }

  const [, owner, repo] = match;
  return { owner, repo };
}

export async function StarGitHubButton({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href">) {
  let stargazers_count = 0;

  try {
    ({
      data: { stargazers_count },
    } = await octokit.request(
      "GET /repos/{owner}/{repo}",
      getGitHubRepoInfo(siteConfig.links.github),
    ));
  } catch {
    //
  }

  return (
    <Link
      href={siteConfig.links.github}
      target="_blank"
      rel="noreferrer"
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "group",
        className,
      )}
      {...props}
    >
      Star on GitHub<span>·</span>
      {stargazers_count}
      <Star className="fill-yellow-500 text-yellow-500 transition-colors group-hover:fill-yellow-500/80 group-hover:text-yellow-500/80 group-focus-visible:fill-yellow-500/80 group-focus-visible:text-yellow-500/80" />
    </Link>
  );
}
