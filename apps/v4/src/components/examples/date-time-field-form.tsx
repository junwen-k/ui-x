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

export default function DateTimeFieldForm() {
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
          <FieldLabel>Event date</FieldLabel>
          <DateTimeField>
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
          <FieldDescription>
            Schedule your event by selecting a date and time.
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
