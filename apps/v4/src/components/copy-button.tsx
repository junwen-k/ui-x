"use client";

import { CheckIcon, ClipboardIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string;
}

export function CopyButton({
  value,
  className,
  variant = "outline",
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn("size-7", className)}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <CheckIcon className="size-3" />
      ) : (
        <ClipboardIcon className="size-3" />
      )}
    </Button>
  );
}
