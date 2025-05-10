"use client";

import * as React from "react";

import {
  Dropzone,
  DropzoneDescription,
  DropzoneGroup,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";
import {
  FileList,
  FileListDescription,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListSize,
} from "@/registry/new-york/ui/file-list";

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
        <FileList>
          {files.map((file) => (
            <FileListItem key={file.name}>
              <FileListHeader>
                <FileListIcon />
                <FileListInfo>
                  <FileListName>{file.name}</FileListName>
                  <FileListDescription>
                    <FileListSize>{file.size}</FileListSize>
                  </FileListDescription>
                </FileListInfo>
              </FileListHeader>
            </FileListItem>
          ))}
        </FileList>
      </div>
    </Dropzone>
  );
}
