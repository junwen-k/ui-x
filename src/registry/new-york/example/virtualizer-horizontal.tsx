import { VList } from "virtua"

import { Card, CardContent } from "@/registry/new-york/ui/card"

const items = Array.from({ length: 10000 }, (_, index) => index)

export default function VirtualizerHorizontal() {
  return (
    <div className="size-80">
      <VList horizontal>
        {items.map((item) => (
          <Card key={item} className="mr-4 aspect-square h-full">
            <CardContent className="flex size-full items-center justify-center p-6">
              <span className="text-4xl font-semibold">{item}</span>
            </CardContent>
          </Card>
        ))}
      </VList>
    </div>
  )
}
