import * as DateTimeFieldPrimitive from "@/registry/default/ui/date-time-field-primitive"

export default function DateTimeFieldPrimitiveDemo() {
  return (
    <DateTimeFieldPrimitive.Root>
      <DateTimeFieldPrimitive.Days placeholder="dd" />
      <DateTimeFieldPrimitive.Separator>/</DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Months placeholder="mm" />
      <DateTimeFieldPrimitive.Separator>/</DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Years placeholder="yyyy" />
      <DateTimeFieldPrimitive.Separator>·</DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Hours placeholder="hh" />
      <DateTimeFieldPrimitive.Separator>:</DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Minutes placeholder="mm" />
      <DateTimeFieldPrimitive.Separator>:</DateTimeFieldPrimitive.Separator>
      <DateTimeFieldPrimitive.Seconds placeholder="ss" />
      <DateTimeFieldPrimitive.AmPm placeholder="am/pm" />
    </DateTimeFieldPrimitive.Root>
  )
}
