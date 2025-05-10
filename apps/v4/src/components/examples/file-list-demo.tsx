"use client";

import { Loader2Icon, Trash2Icon, XIcon } from "lucide-react";
import * as React from "react";

import {
  FileList,
  FileListAction,
  FileListActions,
  FileListContent,
  FileListDescription,
  FileListDescriptionSeparator,
  FileListDescriptionText,
  FileListHeader,
  FileListIcon,
  FileListInfo,
  FileListItem,
  FileListName,
  FileListProgress,
  FileListSize,
} from "@/registry/new-york/ui/file-list";

export default function FileListDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <FileList className="w-[350px]">
      <FileListItem>
        <FileListHeader>
          <FileListIcon />
          <FileListInfo>
            <FileListName>avatar.png</FileListName>
            <FileListDescription>
              <FileListSize>{1000000}</FileListSize>
              <FileListDescriptionSeparator />
              <FileListDescriptionText>45%</FileListDescriptionText>
            </FileListDescription>
          </FileListInfo>
          <FileListActions>
            <FileListAction>
              <Trash2Icon />
              <span className="sr-only">Remove</span>
            </FileListAction>
            <FileListAction>
              <XIcon />
              <span className="sr-only">Close</span>
            </FileListAction>
          </FileListActions>
        </FileListHeader>
        <FileListContent>
          <FileListProgress value={progress} />
        </FileListContent>
      </FileListItem>
      <FileListItem>
        <FileListHeader>
          <FileListIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
              <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
              <path d="M17 18h2" />
              <path d="M20 15h-3v6" />
              <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
            </svg>
          </FileListIcon>
          <FileListInfo>
            <FileListName>resume.pdf</FileListName>
            <FileListDescription>
              <FileListSize>{440000}</FileListSize>
              <FileListDescriptionSeparator />
              <FileListDescriptionText>
                <Loader2Icon className="size-3 animate-spin" />
                Uploading...
              </FileListDescriptionText>
            </FileListDescription>
          </FileListInfo>
          <FileListAction>
            <XIcon className="size-4" />
            <span className="sr-only">Close</span>
          </FileListAction>
        </FileListHeader>
      </FileListItem>
    </FileList>
  );
}
