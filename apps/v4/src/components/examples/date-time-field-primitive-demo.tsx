import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import * as DateTimeFieldPrimitive from "@/registry/new-york/ui/date-time-field-primitive";

const inputStyle =
  "focus:bg-primary dark:focus:bg-primary focus:text-primary-foreground focus:placeholder:text-primary-foreground box-content h-fit flex-initial rounded-sm px-0.5 py-0.5 tabular-nums";

export default function DateTimeFieldPrimitiveDemo() {
  return (
    <DateTimeFieldPrimitive.Root render={<InputGroup className="px-2" />}>
      <DateTimeFieldPrimitive.Days
        placeholder="dd"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
          />
        }
      />
      <DateTimeFieldPrimitive.Separator className="text-muted-foreground">
        /
      </DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Months
        placeholder="mm"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
          />
        }
      />
      <DateTimeFieldPrimitive.Separator className="text-muted-foreground">
        /
      </DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Years
        placeholder="yyyy"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(4ch+0.5rem)]`}
          />
        }
      />
      <DateTimeFieldPrimitive.Separator className="text-muted-foreground">
        ·
      </DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Hours
        placeholder="hh"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
          />
        }
      />
      <DateTimeFieldPrimitive.Separator className="text-muted-foreground">
        :
      </DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Minutes
        placeholder="mm"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
          />
        }
      />
      <DateTimeFieldPrimitive.Separator className="text-muted-foreground">
        :
      </DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Seconds
        placeholder="ss"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
          />
        }
      />
      <DateTimeFieldPrimitive.AmPm
        placeholder="am/pm"
        render={
          <InputGroupInput
            className={`${inputStyle} max-w-[calc(2ch+0.5rem)] text-center`}
          />
        }
      />
    </DateTimeFieldPrimitive.Root>
  );
}
