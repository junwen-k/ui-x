import { BanIcon, CheckCircle2Icon, UploadIcon } from "lucide-react";

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
  DropzoneZone,
} from "@/registry/new-york/ui/dropzone";
import * as DropzonePrimitive from "@/registry/new-york/ui/dropzone-primitive";

export default function DropzoneTriggerDemo() {
  return (
    <Dropzone noClick>
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
