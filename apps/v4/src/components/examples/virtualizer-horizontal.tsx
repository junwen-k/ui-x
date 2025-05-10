"use client";

import { Card, CardContent } from "@/components/ui/card";
import { VirtualizedList } from "@/registry/new-york/ui/virtualized";

const items = Array.from({ length: 10000 }, (_, index) => index);

export default function VirtualizerHorizontal() {
  return (
    <div className="size-80">
      <VirtualizedList orientation="horizontal">
        {items.map((item) => (
          <Card key={item} className="mr-4 aspect-square h-full">
            <CardContent className="flex size-full items-center justify-center p-6">
              <span className="text-4xl font-semibold">{item}</span>
            </CardContent>
          </Card>
        ))}
      </VirtualizedList>
    </div>
  );
}
