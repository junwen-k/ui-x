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
  PhoneInput,
  PhoneInputInput,
} from "@/registry/new-york/ui/phone-input";

export default function PhoneInputForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Contact information</CardTitle>
        <CardDescription>
          How can we reach you if we need to follow up?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="phone-input-form-phone-number">
            Phone number
          </FieldLabel>
          <PhoneInput>
            <PhoneInputInput
              id="phone-input-form-phone-number"
              placeholder="Phone number"
              required
            />
          </PhoneInput>
          <FieldDescription>
            Your phone number is used to contact you.
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
