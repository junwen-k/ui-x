import {
  DateTimeRangeField,
  DateTimeRangeFieldAmPm,
  DateTimeRangeFieldDays,
  DateTimeRangeFieldFrom,
  DateTimeRangeFieldHours,
  DateTimeRangeFieldMinutes,
  DateTimeRangeFieldMonths,
  DateTimeRangeFieldSeconds,
  DateTimeRangeFieldSeparator,
  DateTimeRangeFieldTo,
  DateTimeRangeFieldYears,
} from "@/registry/default/ui/date-time-range-field"

export default function DateTimeRangeFieldDemo() {
  return (
    <DateTimeRangeField>
      <DateTimeRangeFieldFrom>
        <DateTimeRangeFieldDays />
        <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldMonths />
        <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldYears />
        <DateTimeRangeFieldSeparator>·</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldHours />
        <DateTimeRangeFieldSeparator>:</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldMinutes />
        <DateTimeRangeFieldSeparator>:</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldSeconds />
        <DateTimeRangeFieldAmPm />
      </DateTimeRangeFieldFrom>

      <DateTimeRangeFieldTo>
        <DateTimeRangeFieldDays />
        <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldMonths />
        <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldYears />
        <DateTimeRangeFieldSeparator>·</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldHours />
        <DateTimeRangeFieldSeparator>:</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldMinutes />
        <DateTimeRangeFieldSeparator>:</DateTimeRangeFieldSeparator>
        <DateTimeRangeFieldSeconds />
        <DateTimeRangeFieldAmPm />
      </DateTimeRangeFieldTo>
    </DateTimeRangeField>
  )
}
