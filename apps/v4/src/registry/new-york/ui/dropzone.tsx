"use client";

import { Primitive } from "@radix-ui/react-primitive";
import { Ban, CheckCircle2, Upload } from "lucide-react";
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
        "border-input hover:border-accent-foreground/50 hover:bg-accent focus-visible:ring-ring data-[drag-active]:border-accent-foreground/50 data-[drag-reject]:border-destructive data-[drag-active]:bg-accent data-[drag-reject]:bg-destructive/30 cursor-pointer rounded-md border-2 border-dashed p-6 shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none data-[disabled]:cursor-not-allowed data-[disabled]:border-inherit data-[disabled]:bg-inherit data-[disabled]:opacity-50 data-[drag-reject]:cursor-no-drop data-[no-click]:cursor-default",
        className,
      )}
      {...props}
    />
  );
}

function DropzoneUploadIcon({
  className,
  ...props
}: React.ComponentProps<typeof Upload>) {
  return (
    <>
      <DropzonePrimitive.DragAccepted>
        <CheckCircle2
          data-slot="dropzone-upload-icon-accepted"
          className={cn("size-8", className)}
          {...props}
        />
      </DropzonePrimitive.DragAccepted>
      <DropzonePrimitive.DragRejected>
        <Ban
          data-slot="dropzone-upload-icon-rejected"
          className={cn("size-8", className)}
          {...props}
        />
      </DropzonePrimitive.DragRejected>
      <DropzonePrimitive.DragDefault>
        <Upload
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
  ...props
}: React.ComponentProps<typeof Primitive.div>) {
  return (
    <Primitive.div
      data-slot="dropzone-group"
      className={cn("grid place-items-center gap-1.5", className)}
      {...props}
    />
  );
}

function DropzoneTitle({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.h3>) {
  return (
    <Primitive.h3
      data-slot="dropzone-title"
      className={cn("leading-none font-medium tracking-tight", className)}
      {...props}
    />
  );
}

function DropzoneDescription({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.p>) {
  return (
    <Primitive.p
      data-slot="dropzone-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
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
