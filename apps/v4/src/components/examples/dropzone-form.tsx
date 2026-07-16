"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileIcon, XIcon } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { ErrorCode } from "react-dropzone";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { codeToHtml } from "shiki";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import {
  Dropzone,
  DropzoneDescription,
  DropzoneInput,
  DropzoneTitle,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";

// 1 MB
const MAX_FILE_SIZE = 1e6;

const FormSchema = z.object({
  files: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            "File exceed max file size",
          ),
      }),
    )
    .min(1, { message: "Minimum one file is required." }),
});

export default function DropzoneForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      files: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "files",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const html = await codeToHtml(JSON.stringify(data, null, 2), {
      lang: "json",
      theme: "github-dark-dimmed",
      colorReplacements: {
        "#22272e": "var(--color-zinc-900)",
      },
    });

    toast("You submitted the following values:", {
      classNames: { content: "w-full" },
      description: (
        <div
          className="mt-2 [&>pre]:rounded-md [&>pre]:p-4 [&>pre]:shadow-[0_1.5px_2px_0_theme(colors.black/32%),0_0_0_1px_theme(colors.white/10%),0_-1px_0_0_theme(colors.white/4%)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ),
    });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-[40rem] space-y-6"
    >
      <Dropzone
        maxSize={MAX_FILE_SIZE}
        onDropAccepted={(acceptedFiles) =>
          append(acceptedFiles.map((file) => ({ file })))
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
          <Controller
            control={form.control}
            name="files"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>File upload</FieldLabel>
                <DropzoneZone className="flex justify-center">
                  <DropzoneInput
                    id={field.name}
                    disabled={field.disabled}
                    name={field.name}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    aria-invalid={fieldState.invalid}
                  />
                  <div className="flex items-center gap-6">
                    <DropzoneUploadIcon />
                    <div className="grid gap-0.5">
                      <DropzoneTitle>Browse to upload your file</DropzoneTitle>
                      <DropzoneDescription>
                        {`Maximum file size: ${prettyBytes(maxSize ?? 0)}`}
                      </DropzoneDescription>
                    </div>
                  </div>
                </DropzoneZone>
                <FieldDescription>Drag and drop is supported.</FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}
      </Dropzone>
      {!!fields.length && (
        <div className="grid gap-4">
          <h6 className="leading-none font-semibold tracking-tight">{`Files (${fields.length})`}</h6>
          <div className="grid gap-2">
            {fields.map((field, index) => (
              <Attachment key={field.id} className="w-full">
                <AttachmentMedia>
                  <FileIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{field.file.name}</AttachmentTitle>
                  <AttachmentDescription>
                    {prettyBytes(field.file.size)}
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction onClick={() => remove(index)}>
                    <XIcon />
                    <span className="sr-only">Remove</span>
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            ))}
          </div>
        </div>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
}
