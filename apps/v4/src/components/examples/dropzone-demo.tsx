"use client";

import { FileIcon } from "lucide-react";
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
  Dropzone,
  DropzoneDescription,
  DropzoneGroup,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";

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
          <DropzoneGroup className="gap-4">
            <DropzoneUploadIcon />
            <DropzoneGroup>
              <DropzoneTitle>Drop files here or click to upload</DropzoneTitle>
              <DropzoneDescription>
                You can upload files up to 10MB in size. Supported formats: JPG,
                PNG, PDF.
              </DropzoneDescription>
            </DropzoneGroup>
          </DropzoneGroup>
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
