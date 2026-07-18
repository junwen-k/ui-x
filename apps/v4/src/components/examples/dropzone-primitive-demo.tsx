"use client";

import * as React from "react";

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
      <DropzonePrimitive.Zone>
        <DropzonePrimitive.Input />
        <DropzonePrimitive.DragAccepted>
          Drop the files here
        </DropzonePrimitive.DragAccepted>
        <DropzonePrimitive.DragRejected>
          Some files will be rejected
        </DropzonePrimitive.DragRejected>
        <DropzonePrimitive.DragDefault>
          Drop files here or click to upload
        </DropzonePrimitive.DragDefault>
      </DropzonePrimitive.Zone>
      {files.length > 0 && (
        <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </DropzonePrimitive.Root>
  );
}
