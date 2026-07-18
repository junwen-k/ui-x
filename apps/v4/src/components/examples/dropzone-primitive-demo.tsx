"use client";

import { BanIcon, CheckCircle2Icon, FileIcon, UploadIcon } from "lucide-react";
import prettyBytes from "pretty-bytes";
import * as React from "react";

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import * as DropzonePrimitive from "@/registry/new-york/ui/dropzone-primitive";

export default function DropzonePrimitiveDemo() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <DropzonePrimitive.Root
      accept={{
        "image/*": [".jpg", ".png"],
        "application/pdf": [".pdf"],
      }}
      onDropAccepted={setFiles}
    >
      <div className="grid gap-4">
        <DropzonePrimitive.Zone className="border-input hover:border-accent-foreground/50 hover:bg-accent focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[drag-active]:border-accent-foreground/50 data-[drag-reject]:border-destructive data-[drag-active]:bg-accent data-[drag-reject]:bg-destructive/30 cursor-pointer rounded-md border-2 border-dashed p-6 shadow-xs transition-colors outline-none focus-visible:ring-[3px] data-[disabled]:cursor-not-allowed data-[disabled]:border-inherit data-[disabled]:bg-inherit data-[disabled]:opacity-50 data-[drag-reject]:cursor-no-drop data-[no-click]:cursor-default">
          <DropzonePrimitive.Input />
          <div className="grid place-items-center gap-4">
            <DropzonePrimitive.DragAccepted>
              <CheckCircle2Icon className="size-8" />
            </DropzonePrimitive.DragAccepted>
            <DropzonePrimitive.DragRejected>
              <BanIcon className="size-8" />
            </DropzonePrimitive.DragRejected>
            <DropzonePrimitive.DragDefault>
              <UploadIcon className="size-8" />
            </DropzonePrimitive.DragDefault>
            <div className="grid place-items-center gap-1.5">
              <h3 className="leading-none font-medium tracking-tight">
                Drop files here or click to upload
              </h3>
              <p className="text-muted-foreground text-sm">
                You can upload files up to 10MB in size. Supported formats: JPG,
                PNG, PDF.
              </p>
            </div>
          </div>
        </DropzonePrimitive.Zone>
        {files.length > 0 && (
          <div className="grid gap-2">
            {files.map((file) => (
              <Attachment key={file.name} className="w-full">
                <AttachmentMedia>
                  <FileIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{file.name}</AttachmentTitle>
                  <AttachmentDescription>
                    {prettyBytes(file.size)}
                  </AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </div>
        )}
      </div>
    </DropzonePrimitive.Root>
  );
}
