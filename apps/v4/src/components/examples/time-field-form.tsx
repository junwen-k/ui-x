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
  TimeField,
  TimeFieldAmPm,
  TimeFieldHours,
  TimeFieldMinutes,
  TimeFieldSeconds,
  TimeFieldSeparator,
} from "@/registry/new-york/ui/time-field";

export default function TimeFieldForm() {
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
          <FieldLabel>Event time</FieldLabel>
          <TimeField hour12>
            <TimeFieldHours />
            <TimeFieldSeparator />
            <TimeFieldMinutes />
            <TimeFieldSeparator />
            <TimeFieldSeconds />
            <TimeFieldAmPm />
          </TimeField>
          <FieldDescription>
            Schedule your event by selecting a time.
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
