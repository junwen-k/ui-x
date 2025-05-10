import React from "react";

import { cn } from "@/lib/utils";

function DescriptionList({ className, ...props }: React.ComponentProps<"dl">) {
  return (
    <dl
      data-slot="description-list"
      className={cn("grid gap-6", className)}
      {...props}
    />
  );
}

function DescriptionTerm({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      data-slot="description-term"
      className={cn(
        "text-sm leading-none font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function DescriptionDetail({
  className,
  ...props
}: React.ComponentProps<"dd">) {
  return (
    <dd
      data-slot="description-detail"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function DescriptionGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="description-group"
      className={cn("grid gap-1.5", className)}
      {...props}
    />
  );
}

export {
  DescriptionList,
  DescriptionTerm,
  DescriptionDetail,
  DescriptionGroup,
};
