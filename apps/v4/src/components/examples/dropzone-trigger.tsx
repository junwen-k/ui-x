import { Button } from "@/components/ui/button";
import {
  Dropzone,
  DropzoneDescription,
  DropzoneInput,
  DropzoneTitle,
  DropzoneTrigger,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";

export default function DropzoneTriggerDemo() {
  return (
    <Dropzone noClick>
      <DropzoneZone>
        <DropzoneInput />
        <div className="flex flex-col items-center gap-4 text-center">
          <DropzoneUploadIcon />
          <div className="flex flex-col gap-1.5">
            <DropzoneTitle>Drop files here</DropzoneTitle>
            <DropzoneDescription>
              Please upload file with less than 4MB.
            </DropzoneDescription>
          </div>
          <DropzoneTrigger asChild>
            <Button variant="outline" className="w-full">
              Open
            </Button>
          </DropzoneTrigger>
        </div>
      </DropzoneZone>
    </Dropzone>
  );
}
