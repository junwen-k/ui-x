import * as DateTimeRangeFieldPrimitive from "@/registry/new-york/ui/date-time-range-field-primitive";

export default function DateTimeRangeFieldPrimitiveDemo() {
  return (
    <DateTimeRangeFieldPrimitive.Root className="flex">
      <DateTimeRangeFieldPrimitive.From className="flex">
        <DateTimeRangeFieldPrimitive.Days placeholder="dd" />
        <DateTimeRangeFieldPrimitive.Separator>
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Months placeholder="mm" />
        <DateTimeRangeFieldPrimitive.Separator>
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Years placeholder="yy" />
        <DateTimeRangeFieldPrimitive.Separator>
          ·
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Hours placeholder="--" />
        <DateTimeRangeFieldPrimitive.Separator>
          :
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Minutes placeholder="--" />
        <DateTimeRangeFieldPrimitive.AmPm placeholder="--" />
      </DateTimeRangeFieldPrimitive.From>

      <DateTimeRangeFieldPrimitive.Separator>
        -
      </DateTimeRangeFieldPrimitive.Separator>

      <DateTimeRangeFieldPrimitive.To className="flex">
        <DateTimeRangeFieldPrimitive.Days placeholder="dd" />
        <DateTimeRangeFieldPrimitive.Separator>
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Months placeholder="mm" />
        <DateTimeRangeFieldPrimitive.Separator>
          /
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Years placeholder="yy" />
        <DateTimeRangeFieldPrimitive.Separator>
          ·
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Hours placeholder="--" />
        <DateTimeRangeFieldPrimitive.Separator>
          :
        </DateTimeRangeFieldPrimitive.Separator>
        <DateTimeRangeFieldPrimitive.Minutes placeholder="--" />
        <DateTimeRangeFieldPrimitive.AmPm placeholder="--" />
      </DateTimeRangeFieldPrimitive.To>
    </DateTimeRangeFieldPrimitive.Root>
  );
}
