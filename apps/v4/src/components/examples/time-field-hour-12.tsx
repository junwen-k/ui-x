import {
  TimeField,
  TimeFieldAmPm,
  TimeFieldHours,
  TimeFieldMinutes,
  TimeFieldSeconds,
  TimeFieldSeparator,
} from "@/registry/new-york/ui/time-field";

export default function TimeFieldHour12() {
  return (
    <TimeField hour12>
      <TimeFieldHours />
      <TimeFieldSeparator />
      <TimeFieldMinutes />
      <TimeFieldSeparator />
      <TimeFieldSeconds />
      <TimeFieldAmPm />
    </TimeField>
  );
}
