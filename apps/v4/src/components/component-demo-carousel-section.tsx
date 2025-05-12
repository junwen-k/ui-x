import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import {
  ComponentCanvas,
  ComponentCanvasExample,
} from "@/components/component-preview";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export function ComponentDemoCarouselSection() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8">
        <h2 className="from-foreground to-muted-foreground bg-gradient-to-b bg-clip-text text-center text-4xl font-bold tracking-tighter text-balance text-transparent">
          Supercharged components that elevate shadcn/ui
        </h2>
        <Carousel>
          <CarouselContent>
            {[
              {
                name: "badge-group-demo",
                title: "Badge Group",
                description:
                  "A badge group is a focusable list of labels, categories, keywords, filters, or other items, with support for keyboard navigation, selection, and removal.",
              },
              {
                name: "calendar-dropdown-layout",
                title: "Calendar",
                description:
                  "A calendar component lets users select a date without any input or popper / modal.",
              },
              {
                name: "combobox-demo",
                title: "Combobox",
                description:
                  "Input field with autocomplete & autosuggest functionalities.",
              },
              {
                name: "confirmer-demo",
                title: "Confirmer",
                description: "Imperative confirm dialog implementation.",
              },
              {
                name: "control-group-demo",
                title: "Control Group",
                description:
                  "A component for grouping form controls like text inputs, buttons, selects and other elements into a single cohesive unit.",
              },
              {
                name: "date-field-demo",
                title: "Date Field",
                description: "Date Field allows user to enter date value.",
              },
              {
                name: "dropzone-demo",
                title: "Dropzone",
                description:
                  "A dropzone is an area into which one or multiple objects can be dragged and dropped.",
              },
            ].map((item, index) => (
              <CarouselItem key={index} className="basis-96">
                <div className="flex flex-col gap-4">
                  <ComponentCanvas className="flex aspect-square items-center justify-center p-4">
                    <ComponentCanvasExample name={item.name} />
                  </ComponentCanvas>
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
            <CarouselItem className="basis-96">
              <div className="bg-card flex aspect-square flex-col items-center justify-center gap-2 rounded-md border p-8 text-center">
                <p className="text-muted-foreground text-sm">
                  Explore more components
                </p>
                <Button asChild variant="outline">
                  <Link href="/docs/components">
                    Browse components
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
