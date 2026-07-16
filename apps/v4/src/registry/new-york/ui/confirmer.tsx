"use client";

import { createCallable } from "react-call";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  cancelText?: React.ReactNode;
  actionText?: React.ReactNode;
  CancelProps?: React.ComponentProps<typeof AlertDialogCancel>;
  ActionProps?: React.ComponentProps<typeof AlertDialogAction>;
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
            <AlertDialogDescription>
              {options.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel {...options.CancelProps}>
              {options.cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              {...options.ActionProps}
              onClick={() => call.end(true)}
            >
              {options.actionText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
  UNMOUNTING_DELAY,
);

const Confirmer = CallableConfirm.Root;

const confirm = CallableConfirm.call;

export { Confirmer, confirm };
