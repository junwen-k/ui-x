import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Dropzone,
  DropzoneInput,
  DropzoneTrigger,
  DropzoneUploadIcon,
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";

export default function DropzoneTriggerDemo() {
  return (
    <Dropzone noClick>
      <DropzoneZone>
        <DropzoneInput />
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <DropzoneUploadIcon />
            </EmptyMedia>
            <EmptyTitle>Drop files here</EmptyTitle>
            <EmptyDescription>
              Please upload file with less than 4MB.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <DropzoneTrigger
              render={<Button variant="outline" className="w-full" />}
            >
              Open
            </DropzoneTrigger>
          </EmptyContent>
        </Empty>
      </DropzoneZone>
    </Dropzone>
  );
}
