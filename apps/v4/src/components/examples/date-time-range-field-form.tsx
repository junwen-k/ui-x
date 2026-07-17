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
  DateTimeRangeField,
  DateTimeRangeFieldDays,
  DateTimeRangeFieldFrom,
  DateTimeRangeFieldMonths,
  DateTimeRangeFieldSeparator,
  DateTimeRangeFieldTo,
  DateTimeRangeFieldYears,
} from "@/registry/new-york/ui/date-time-range-field";

export default function DateTimeRangeFieldForm() {
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
          <DateTimeRangeField>
            <DateTimeRangeFieldFrom>
              <DateTimeRangeFieldDays />
              <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
              <DateTimeRangeFieldMonths />
              <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
              <DateTimeRangeFieldYears />
            </DateTimeRangeFieldFrom>
            <DateTimeRangeFieldSeparator>-</DateTimeRangeFieldSeparator>
            <DateTimeRangeFieldTo>
              <DateTimeRangeFieldDays />
              <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
              <DateTimeRangeFieldMonths />
              <DateTimeRangeFieldSeparator>/</DateTimeRangeFieldSeparator>
              <DateTimeRangeFieldYears />
            </DateTimeRangeFieldTo>
          </DateTimeRangeField>
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
