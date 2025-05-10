"use client";

import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { zodResolver } from "@hookform/resolvers/zod";
import { GripVertical, Pencil, PlusCircle, Trash2 } from "lucide-react";
import * as React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { codeToHtml } from "shiki";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Sortable,
  SortableItem,
  SortableItemTrigger,
  SortableList,
  SortableOverlay,
} from "@/registry/new-york/ui/sortable";

function Item({
  title,
  description,
  className,
  onRemove,
  onEdit,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
  onRemove?: React.ComponentProps<typeof Button>["onClick"];
  onEdit: React.ComponentProps<typeof EditItemFormDialog>["onSubmit"];
}) {
  return (
    <Card
      className={cn(
        "group focus-visible:ring-ring cursor-grab flex-row items-stretch gap-0 overflow-hidden rounded-md p-0 focus-visible:ring-1 focus-visible:outline-none aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-pressed:z-10 aria-pressed:cursor-grabbing aria-pressed:shadow-lg",
        className,
      )}
      {...props}
    >
      <SortableItemTrigger
        tabIndex={0}
        className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground flex cursor-grab items-center justify-center transition-colors focus-visible:outline-none aria-pressed:cursor-grabbing"
      >
        <GripVertical className="size-4" />
      </SortableItemTrigger>
      <div className="flex flex-1 items-center justify-between gap-4 px-3 py-2 text-sm">
        <div className="flex flex-col gap-1">
          <div className="line-clamp-1 text-sm font-medium">{title}</div>
          <div className="text-muted-foreground line-clamp-1 text-xs">
            {description}
          </div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <EditItemFormDialog
            title="Edit item"
            description="Make changes to your item here. Click save when you're done."
            actionText="Save"
            onSubmit={onEdit}
            values={{ title, description }}
          >
            <EditItemFormDialogTrigger asChild>
              <Button type="button" variant="outline" size="icon">
                <Pencil className="size-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </EditItemFormDialogTrigger>
          </EditItemFormDialog>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}

const EditItemFormDialogSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

interface EditItemFormDialogProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actionText: React.ReactNode;
  onSubmit: (data: z.infer<typeof EditItemFormDialogSchema>) => void;
  values?: z.infer<typeof EditItemFormDialogSchema>;
}

const EditItemFormDialog = ({
  children,
  title,
  description,
  actionText,
  onSubmit,
  values,
}: EditItemFormDialogProps) => {
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof EditItemFormDialogSchema>>({
    resolver: zodResolver(EditItemFormDialogSchema),
    values,
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof EditItemFormDialogSchema>) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={(event) => {
              event.stopPropagation();
              event.preventDefault();

              form.handleSubmit(handleSubmit)(event);
            }}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">{actionText}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

const EditItemFormDialogTrigger = DialogTrigger;

const items = [
  {
    id: "item-1",
    title: "Introduction to React",
    description: "Learn the basics of React and component-based architecture",
  },
  {
    id: "item-2",
    title: "State Management",
    description: "Explore different state management solutions in React",
  },
  {
    id: "item-3",
    title: "React Hooks",
    description: "Master the use of hooks for state and side effects",
  },
  {
    id: "item-4",
    title: "Performance Optimization",
    description: "Techniques to optimize React application performance",
  },
  {
    id: "item-5",
    title: "Testing React Apps",
    description: "Learn testing strategies and tools for React applications",
  },
  {
    id: "item-6",
    title: "React Router",
    description: "Implement client-side routing in React applications",
  },
  {
    id: "item-7",
    title: "Server Components",
    description:
      "Build server-rendered React components for better performance",
  },
  {
    id: "item-8",
    title: "React Query",
    description: "Manage server state and caching in React applications",
  },
];

const FormSchema = z.object({
  items: EditItemFormDialogSchema.array().min(1, {
    message: "Please add at least 1 item",
  }),
});

export default function SortableForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items,
    },
  });
  const { fields, append, move, remove, update } = useFieldArray({
    control: form.control,
    name: "items",
    keyName: "_id",
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <Sortable
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                onDragEnd={(event) => {
                  const { active, over } = event;

                  if (over && active.id !== over.id) {
                    const oldIndex = fields.findIndex(
                      (field) => field._id === active.id,
                    );
                    const newIndex = fields.findIndex(
                      (field) => field._id === over.id,
                    );

                    move(oldIndex, newIndex);
                  }
                }}
              >
                <SortableList
                  items={fields.map((field) => field._id)}
                  className="flex flex-col gap-3"
                >
                  {fields.length > 0 ? (
                    fields.map((field, index) => (
                      <SortableItem asChild key={field._id} id={field._id}>
                        <Item
                          title={field.title}
                          description={field.description}
                          tabIndex={undefined}
                          onRemove={() => remove(index)}
                          onEdit={(data) => update(index, data)}
                          className="aria-pressed:opacity-50 aria-pressed:shadow-sm"
                        />
                      </SortableItem>
                    ))
                  ) : (
                    <div className="text-muted-foreground flex h-32 min-w-96 flex-col items-center justify-center gap-3 rounded-lg border border-dashed text-sm">
                      No items added
                    </div>
                  )}
                </SortableList>
                <SortableOverlay>
                  {(activeId) => {
                    const activeItem = fields.find(
                      (field) => field._id === activeId,
                    );
                    if (!activeItem) {
                      return null;
                    }

                    return (
                      <Item
                        title={activeItem.title}
                        description={activeItem.description}
                        onEdit={() => {}}
                        className="cursor-grabbing shadow-lg"
                      />
                    );
                  }}
                </SortableOverlay>
              </Sortable>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between gap-4">
          <EditItemFormDialog
            title="Add item"
            description="Add a new item to your list. Click add item when you're done."
            actionText="Add item"
            onSubmit={(data) => append(data)}
          >
            <EditItemFormDialogTrigger asChild>
              <Button type="button" variant="outline">
                <PlusCircle />
                Add Item
              </Button>
            </EditItemFormDialogTrigger>
          </EditItemFormDialog>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
