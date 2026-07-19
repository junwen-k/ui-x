import {
  DateField,
  DateFieldDays,
  DateFieldMonths,
  DateFieldSeparator,
  DateFieldYears,
} from "@/registry/new-york/ui/date-field";

export default function DateFieldDemo() {
  return (
    <DateField className="max-w-xs">
      <DateFieldDays />
      <DateFieldSeparator />
      <DateFieldMonths />
      <DateFieldSeparator />
      <DateFieldYears />
    </DateField>
  );
}
