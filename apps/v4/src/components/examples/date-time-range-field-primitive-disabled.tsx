import * as DateTimeRangeFieldPrimitive from "@/registry/new-york/ui/date-time-range-field-primitive";

export default function DateTimeRangeFieldPrimitiveDisabled() {
  return (
    <DateTimeRangeFieldPrimitive.Root className="flex" disabled>
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
