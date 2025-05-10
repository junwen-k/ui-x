import {
  TimeField,
  TimeFieldAmPm,
  TimeFieldHours,
  TimeFieldMinutes,
  TimeFieldSeconds,
  TimeFieldSeparator,
} from "@/registry/new-york/ui/time-field";

export default function TimeFieldDemo() {
  return (
    <TimeField>
      <TimeFieldHours />
      <TimeFieldSeparator />
      <TimeFieldMinutes />
      <TimeFieldSeparator />
      <TimeFieldSeconds />
      <TimeFieldAmPm />
    </TimeField>
  );
}
