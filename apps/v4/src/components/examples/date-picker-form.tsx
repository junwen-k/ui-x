import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerContent,
  DatePickerInput,
} from "@/registry/new-york/ui/date-picker";

export default function DatePickerForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Schedule your event</CardTitle>
        <CardDescription>
          Let attendees know when your event takes place.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Event period</FieldLabel>
          <DatePicker mode="range">
            <DatePickerInput className="w-full" />
            <DatePickerContent>
              <DatePickerCalendar hideNavigation captionLayout="dropdown" />
            </DatePickerContent>
          </DatePicker>
          <FieldDescription>
            Schedule your event by selecting a start and end date.
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
