"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { BanIcon, CheckCircle2Icon, UploadIcon } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";
import * as DropzonePrimitive from "@/registry/new-york/ui/dropzone-primitive";

function Dropzone(props: React.ComponentProps<typeof DropzonePrimitive.Root>) {
  return <DropzonePrimitive.Root data-slot="dropzone" {...props} />;
}

function DropzoneInput(
  props: React.ComponentProps<typeof DropzonePrimitive.Input>,
) {
  return <DropzonePrimitive.Input data-slot="dropzone-input" {...props} />;
}

function DropzoneZone({
  className,
  ...props
}: React.ComponentProps<typeof DropzonePrimitive.Zone>) {
  return (
    <DropzonePrimitive.Zone
      data-slot="dropzone-zone"
      className={cn(
        "border-input hover:border-accent-foreground/50 hover:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[drag-active]:border-accent-foreground/50 data-[drag-reject]:border-destructive data-[drag-active]:bg-accent data-[drag-reject]:bg-destructive/30 cursor-pointer rounded-lg border-2 border-dashed p-6 shadow-xs transition-colors outline-none focus-visible:ring-3 data-[disabled]:cursor-not-allowed data-[disabled]:border-inherit data-[disabled]:bg-inherit data-[disabled]:opacity-50 data-[drag-reject]:cursor-no-drop data-[no-click]:cursor-default",
        className,
      )}
      {...props}
    />
  );
}

function DropzoneUploadIcon({
  className,
  ...props
}: React.ComponentProps<typeof UploadIcon>) {
  return (
    <>
      <DropzonePrimitive.DragAccepted>
        <CheckCircle2Icon
          data-slot="dropzone-upload-icon-accepted"
          className={cn("size-8", className)}
          {...props}
        />
      </DropzonePrimitive.DragAccepted>
      <DropzonePrimitive.DragRejected>
        <BanIcon
          data-slot="dropzone-upload-icon-rejected"
          className={cn("size-8", className)}
          {...props}
        />
      </DropzonePrimitive.DragRejected>
      <DropzonePrimitive.DragDefault>
        <UploadIcon
          data-slot="dropzone-upload-icon-default"
          className={cn("size-8", className)}
          {...props}
        />
      </DropzonePrimitive.DragDefault>
    </>
  );
}

function DropzoneGroup({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) {
  return useRender({
    render,
    defaultTagName: "div",
    props: mergeProps<"div">(
      {
        "data-slot": "dropzone-group",
        className: cn("grid place-items-center gap-1.5", className),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

function DropzoneTitle({
  className,
  render,
  ...props
}: useRender.ComponentProps<"h3">) {
  return useRender({
    render,
    defaultTagName: "h3",
    props: mergeProps<"h3">(
      {
        "data-slot": "dropzone-title",
        className: cn("leading-none font-medium tracking-tight", className),
      } as React.ComponentProps<"h3">,
      props,
    ),
  });
}

function DropzoneDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"p">) {
  return useRender({
    render,
    defaultTagName: "p",
    props: mergeProps<"p">(
      {
        "data-slot": "dropzone-description",
        className: cn("text-muted-foreground text-sm", className),
      } as React.ComponentProps<"p">,
      props,
    ),
  });
}

function DropzoneTrigger(
  props: React.ComponentProps<typeof DropzonePrimitive.Trigger>,
) {
  return <DropzonePrimitive.Trigger data-slot="dropzone-trigger" {...props} />;
}

function DropzoneAccepted(
  props: React.ComponentProps<typeof DropzonePrimitive.Accepted>,
) {
  return (
    <DropzonePrimitive.Accepted data-slot="dropzone-accepted" {...props} />
  );
}

function DropzoneRejected(
  props: React.ComponentProps<typeof DropzonePrimitive.Rejected>,
) {
  return (
    <DropzonePrimitive.Rejected data-slot="dropzone-rejected" {...props} />
  );
}

export {
  Dropzone,
  DropzoneInput,
  DropzoneZone,
  DropzoneUploadIcon,
  DropzoneGroup,
  DropzoneTitle,
  DropzoneDescription,
  DropzoneTrigger,
  DropzoneAccepted,
  DropzoneRejected,
};
