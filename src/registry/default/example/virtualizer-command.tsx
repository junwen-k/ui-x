import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/default/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/default/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover"
import {
  Virtualized,
  VirtualizedVirtualizer,
} from "@/registry/default/ui/virtualized"

const items = Array.from({ length: 10000 }, (_, index) => ({
  label: `Item ${index + 1}`,
  value: index.toString(),
}))

export default function VirtualizerCommand() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [inputValue, setInputValue] = React.useState("")

  const filtered = React.useMemo(() => {
    if (!inputValue) {
      return items
    }

    return items.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [inputValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : "Select item..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput
            value={inputValue}
            onValueChange={setInputValue}
            placeholder="Search item..."
            className="h-9"
          />
          <Virtualized asChild>
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              <CommandGroup>
                <VirtualizedVirtualizer>
                  {filtered.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setInputValue(
                          filtered.find((item) => item.value === currentValue)
                            ?.label || ""
                        )
                        setOpen(false)
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </VirtualizedVirtualizer>
              </CommandGroup>
            </CommandList>
          </Virtualized>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
