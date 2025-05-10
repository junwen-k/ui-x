"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { confirm } from "@/registry/new-york/ui/confirmer";

export default function ConfirmerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        confirm({
          title: "Are you absolutely sure?",
          description:
            "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
        }).then(
          (confirmed) => confirmed && toast("Your account has been deleted."),
        );
      }}
    >
      Show Dialog
    </Button>
  );
}
