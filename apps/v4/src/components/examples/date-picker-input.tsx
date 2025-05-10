import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
} from "@/registry/new-york/ui/date-picker";

export default function DatePickerInputDemo() {
  return (
    <DatePicker mode="single">
      <DatePickerInput className="w-[280px]" />
      <DatePickerContent>
        <DatePickerCalendar />
      </DatePickerContent>
    </DatePicker>
  );
}
