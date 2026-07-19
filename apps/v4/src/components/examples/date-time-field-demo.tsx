import {
  DateTimeField,
  DateTimeFieldAmPm,
  DateTimeFieldDays,
  DateTimeFieldHours,
  DateTimeFieldMinutes,
  DateTimeFieldMonths,
  DateTimeFieldSeconds,
  DateTimeFieldSeparator,
  DateTimeFieldYears,
} from "@/registry/new-york/ui/date-time-field";

export default function DateTimeFieldDemo() {
  return (
    <DateTimeField className="max-w-xs">
      <DateTimeFieldDays />
      <DateTimeFieldSeparator>/</DateTimeFieldSeparator>
      <DateTimeFieldMonths />
      <DateTimeFieldSeparator>/</DateTimeFieldSeparator>
      <DateTimeFieldYears />
      <DateTimeFieldSeparator>·</DateTimeFieldSeparator>
      <DateTimeFieldHours />
      <DateTimeFieldSeparator>:</DateTimeFieldSeparator>
      <DateTimeFieldMinutes />
      <DateTimeFieldSeparator>:</DateTimeFieldSeparator>
      <DateTimeFieldSeconds />
      <DateTimeFieldAmPm />
    </DateTimeField>
  );
}
