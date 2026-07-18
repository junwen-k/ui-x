"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  CopyIcon,
  ExternalLinkIcon,
} from "lucide-react";
import * as React from "react";

import { copyToClipboard } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PageActionsProps {
  markdown: string;
  markdownUrl: string;
  githubUrl: string;
}

export function PageActions({
  markdown,
  markdownUrl,
  githubUrl,
}: PageActionsProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (!hasCopied) {
      return;
    }

    const timer = setTimeout(() => setHasCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [hasCopied]);

  const prompt = `Read ${markdownUrl} so you can answer questions about this page.`;

  const openIn = [
    {
      label: "Open in ChatGPT",
      href: `https://chatgpt.com/?${new URLSearchParams({ q: prompt })}`,
    },
    {
      label: "Open in Claude",
      href: `https://claude.ai/new?${new URLSearchParams({ q: prompt })}`,
    },
    {
      label: "View as Markdown",
      href: markdownUrl,
    },
    {
      label: "Open in GitHub",
      href: githubUrl,
    },
  ];

  return (
    <ButtonGroup>
      <Button
        variant="secondary"
        size="sm"
        className="gap-1 shadow-none"
        onClick={async () => {
          if (await copyToClipboard(markdown)) {
            setHasCopied(true);
          }
        }}
      >
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
        Copy page
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="secondary" size="icon-sm" className="shadow-none">
              <ChevronDownIcon />
              <span className="sr-only">More page actions</span>
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          {openIn.map((item) => (
            <DropdownMenuItem
              key={item.label}
              render={
                <a href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                  <ExternalLinkIcon className="text-muted-foreground ml-auto size-3.5" />
                </a>
              }
            />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
}
