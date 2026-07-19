"use client";

import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { arrayMove } from "@dnd-kit/sortable";
import { GripVertical, Pencil, PlusCircle, Trash2 } from "lucide-react";
import * as React from "react";

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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
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
            <EditItemFormDialogTrigger
              render={<Button type="button" variant="outline" size="icon" />}
            >
              <Pencil className="size-4" />
              <span className="sr-only">Edit</span>
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

interface EditItemFormDialogProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  actionText: React.ReactNode;
  onSubmit: (data: { title: string; description: string }) => void;
  values?: { title: string; description: string };
}

const EditItemFormDialog = ({
  children,
  title,
  description,
  actionText,
  onSubmit,
  values,
}: EditItemFormDialogProps) => {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-[425px]">
        <form
          onSubmit={(event) => {
            event.stopPropagation();
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            onSubmit({
              title: formData.get("title") as string,
              description: formData.get("description") as string,
            });
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Field>
              <FieldLabel htmlFor={`${id}-title`}>Title</FieldLabel>
              <Input
                id={`${id}-title`}
                name="title"
                defaultValue={values?.title}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${id}-description`}>Description</FieldLabel>
              <Textarea
                id={`${id}-description`}
                name="description"
                defaultValue={values?.description}
                required
              />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">{actionText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditItemFormDialogTrigger = DialogTrigger;

const lessons = [
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

export default function SortableForm() {
  const [items, setItems] = React.useState(lessons);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Course curriculum</CardTitle>
        <CardDescription>
          Drag and drop to reorder the lessons in your course.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sortable
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragEnd={(event) => {
            const { active, over } = event;

            if (over && active.id !== over.id) {
              setItems((items) => {
                const oldIndex = items.findIndex(
                  (item) => item.id === active.id,
                );
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
              });
            }
          }}
        >
          <SortableList
            items={items.map((item) => item.id)}
            className="flex flex-col gap-3"
          >
            {items.length > 0 ? (
              items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  render={
                    <Item
                      title={item.title}
                      description={item.description}
                      tabIndex={undefined}
                      onRemove={() =>
                        setItems((items) =>
                          items.filter(({ id }) => id !== item.id),
                        )
                      }
                      onEdit={(data) =>
                        setItems((items) =>
                          items.map((current) =>
                            current.id === item.id
                              ? { ...current, ...data }
                              : current,
                          ),
                        )
                      }
                      className="aria-pressed:opacity-50 aria-pressed:shadow-sm"
                    />
                  }
                />
              ))
            ) : (
              <div className="text-muted-foreground flex h-32 flex-col items-center justify-center gap-3 rounded-lg border border-dashed text-sm">
                No items added
              </div>
            )}
          </SortableList>
          <SortableOverlay>
            {(activeId) => {
              const activeItem = items.find((item) => item.id === activeId);
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
      </CardContent>
      <CardFooter className="justify-between gap-4">
        <EditItemFormDialog
          title="Add item"
          description="Add a new item to your list. Click add item when you're done."
          actionText="Add item"
          onSubmit={(data) =>
            setItems((items) => [
              ...items,
              { id: crypto.randomUUID(), ...data },
            ])
          }
        >
          <EditItemFormDialogTrigger
            render={<Button type="button" variant="outline" />}
          >
            <PlusCircle />
            Add Item
          </EditItemFormDialogTrigger>
        </EditItemFormDialog>
        <Button type="submit">Save</Button>
      </CardFooter>
    </Card>
  );
}
