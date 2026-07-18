import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import * as DateTimeRangeFieldPrimitive from "@/registry/new-york/ui/date-time-range-field-primitive";

const inputStyle =
  "focus:bg-primary dark:focus:bg-primary focus:text-primary-foreground focus:placeholder:text-primary-foreground box-content h-fit flex-initial rounded-sm px-0.5 py-0.5 tabular-nums";

export default function DateTimeRangeFieldPrimitiveDisabled() {
  return (
    <DateTimeRangeFieldPrimitive.Root
      disabled
      render={<InputGroup className="gap-1.5 px-2" />}
    >
      <DateTimeRangeFieldPrimitive.From className="flex items-center">
        <DateTimeRangeFieldPrimitive.Days
          placeholder="dd"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Months
          placeholder="mm"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Years
          placeholder="yy"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          ·
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Hours
          placeholder="--"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          :
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Minutes
          placeholder="--"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.AmPm
          placeholder="--"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)] text-center`}
            />
          }
        />
      </DateTimeRangeFieldPrimitive.From>

      <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
        -
      </DateTimeRangeFieldPrimitive.Separator>

      <DateTimeRangeFieldPrimitive.To className="flex items-center">
        <DateTimeRangeFieldPrimitive.Days
          placeholder="dd"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Months
          placeholder="mm"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Years
          placeholder="yy"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          ·
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Hours
          placeholder="--"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.Separator className="text-muted-foreground">
          :
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Minutes
          placeholder="--"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)]`}
            />
          }
        />
        <DateTimeRangeFieldPrimitive.AmPm
          placeholder="--"
          render={
            <InputGroupInput
              className={`${inputStyle} max-w-[calc(2ch+0.5rem)] text-center`}
            />
          }
        />
      </DateTimeRangeFieldPrimitive.To>
    </DateTimeRangeFieldPrimitive.Root>
  );
}
