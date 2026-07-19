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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Dropzone,
  DropzoneInput,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";
import * as DropzonePrimitive from "@/registry/new-york/ui/dropzone-primitive";

export default function DropzoneDemo() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Dropzone
      accept={{
        "image/*": [".jpg", ".png"],
        "application/pdf": [".pdf"],
      }}
      onDropAccepted={setFiles}
    >
      <div className="grid gap-4">
        <DropzoneZone>
          <DropzoneInput />
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <DropzonePrimitive.DragAccepted>
                  <CheckCircle2Icon />
                </DropzonePrimitive.DragAccepted>
                <DropzonePrimitive.DragRejected>
                  <BanIcon />
                </DropzonePrimitive.DragRejected>
                <DropzonePrimitive.DragDefault>
                  <UploadIcon />
                </DropzonePrimitive.DragDefault>
              </EmptyMedia>
              <EmptyTitle>Drop files here or click to upload</EmptyTitle>
              <EmptyDescription>
                You can upload files up to 10MB in size. Supported formats: JPG,
                PNG, PDF.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </DropzoneZone>
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
    </Dropzone>
  );
}
