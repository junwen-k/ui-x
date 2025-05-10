"use client";

import { createCallable } from "react-call";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: React.ReactNode;
  actionText?: React.ReactNode;
  CancelProps?: React.ComponentProps<typeof AlertDialogCancel>;
  ActionProps?: React.ComponentProps<typeof Button>;
}

const defaultOptions = {
  title: "Are you sure?",
  cancelText: "Cancel",
  actionText: "Continue",
} as const satisfies ConfirmOptions;

export type ConfirmResponse = boolean;

const UNMOUNTING_DELAY = 200;

const CallableConfirm = createCallable<ConfirmOptions, ConfirmResponse>(
  ({ call, ...payload }) => {
    const options = { ...defaultOptions, ...payload };

    return (
      <AlertDialog
        open={!call.ended}
        onOpenChange={(open) => !open && call.end(false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{options.title}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>{options.description}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel {...options.CancelProps}>
              {options.cancelText}
            </AlertDialogCancel>
            <Button {...options.ActionProps} onClick={() => call.end(true)}>
              {options.actionText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
  UNMOUNTING_DELAY,
);

export const Confirmer = CallableConfirm.Root;

export const confirm = CallableConfirm.call;
