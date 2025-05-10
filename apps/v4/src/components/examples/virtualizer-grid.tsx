"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { VirtualizedGrid } from "@/registry/new-york/ui/virtualized";

export default function VirtualizerGrid() {
  return (
    <div className="size-80">
      <VirtualizedGrid row={500} col={500}>
        {({ rowIndex, colIndex }) => (
          <Card
            key={`${rowIndex}-${colIndex}`}
            className={cn(
              "m-2",
              rowIndex === 0 && "mt-0",
              rowIndex === 499 && "mb-0",
              colIndex === 0 && "ml-0",
              colIndex === 499 && "mr-0",
            )}
          >
            <CardContent className="flex aspect-square items-center justify-center p-6">
              <span className="text-4xl font-semibold">{`${rowIndex}/${colIndex}`}</span>
            </CardContent>
          </Card>
        )}
      </VirtualizedGrid>
    </div>
  );
}
