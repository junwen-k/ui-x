"use client";

import {
  BanIcon,
  CheckCircle2Icon,
  FileIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import prettyBytes from "pretty-bytes";
import * as React from "react";
import { ErrorCode } from "react-dropzone";
import { toast } from "sonner";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Dropzone,
  DropzoneInput,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";
import * as DropzonePrimitive from "@/registry/new-york/ui/dropzone-primitive";

// 1 MB
const MAX_FILE_SIZE = 1e6;

export default function DropzoneForm() {
  const [files, setFiles] = React.useState<File[]>([]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Upload your files</CardTitle>
        <CardDescription>
          Attach the documents you would like to share.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Dropzone
          maxSize={MAX_FILE_SIZE}
          onDropAccepted={(acceptedFiles) =>
            setFiles((files) => [...files, ...acceptedFiles])
          }
          onDropRejected={(fileRejections) => {
            fileRejections.forEach((fileRejection) => {
              if (
                fileRejection.errors.some(
                  (err) => err.code === ErrorCode.FileTooLarge,
                )
              ) {
                toast.error("File size too large.", {
                  description: `File '${fileRejection.file.name}' is too large.`,
                });
              }
            });
          }}
        >
          {({ maxSize }) => (
            <Field>
              <FieldLabel htmlFor="dropzone-form-files">File upload</FieldLabel>
              <DropzoneZone className="flex justify-center">
                <DropzoneInput id="dropzone-form-files" />
                <Empty>
                  <EmptyHeader className="flex-row items-center gap-6 text-left">
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
                    <div className="grid gap-0.5">
                      <EmptyTitle>Browse to upload your file</EmptyTitle>
                      <EmptyDescription>
                        {`Maximum file size: ${prettyBytes(maxSize ?? 0)}`}
                      </EmptyDescription>
                    </div>
                  </EmptyHeader>
                </Empty>
              </DropzoneZone>
              <FieldDescription>Drag and drop is supported.</FieldDescription>
            </Field>
          )}
        </Dropzone>
        {!!files.length && (
          <div className="grid gap-4">
            <h6 className="leading-none font-semibold tracking-tight">{`Files (${files.length})`}</h6>
            <div className="grid gap-2">
              {files.map((file, index) => (
                <Attachment key={index} className="w-full">
                  <AttachmentMedia>
                    <FileIcon />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{file.name}</AttachmentTitle>
                    <AttachmentDescription>
                      {prettyBytes(file.size)}
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    <AttachmentAction
                      onClick={() =>
                        setFiles((files) =>
                          files.filter((_, fileIndex) => fileIndex !== index),
                        )
                      }
                    >
                      <XIcon />
                      <span className="sr-only">Remove</span>
                    </AttachmentAction>
                  </AttachmentActions>
                </Attachment>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
