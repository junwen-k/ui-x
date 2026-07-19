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
  DateField,
  DateFieldDays,
  DateFieldMonths,
  DateFieldSeparator,
  DateFieldYears,
} from "@/registry/new-york/ui/date-field";

export default function DateFieldForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Personal information</CardTitle>
        <CardDescription>Tell us a little bit about yourself.</CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel>Date of birth</FieldLabel>
          <DateField>
            <DateFieldDays />
            <DateFieldSeparator />
            <DateFieldMonths />
            <DateFieldSeparator />
            <DateFieldYears />
          </DateField>
          <FieldDescription>
            Your date of birth is used to calculate your age.
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
