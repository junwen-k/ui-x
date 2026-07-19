import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputGroupAddon } from "@/components/ui/input-group";
import {
  PasswordInput,
  PasswordInputAdornmentToggle,
  PasswordInputInput,
} from "@/registry/new-york/ui/password-input";

export default function PasswordInputForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Choose a strong password to secure your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="password-input-form-password">
              Password
            </FieldLabel>
            <PasswordInput>
              <InputGroupAddon>
                <LockKeyhole />
              </InputGroupAddon>
              <PasswordInputInput
                id="password-input-form-password"
                autoComplete="new-password"
                placeholder="Password"
                required
                minLength={12}
              />
              <PasswordInputAdornmentToggle />
            </PasswordInput>
            <FieldDescription>
              Must be at least 12 characters long.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password-input-form-confirm-password">
              Confirm Password
            </FieldLabel>
            <PasswordInput>
              <InputGroupAddon>
                <LockKeyhole />
              </InputGroupAddon>
              <PasswordInputInput
                id="password-input-form-confirm-password"
                autoComplete="new-password"
                placeholder="Confirm Password"
                required
                minLength={12}
              />
              <PasswordInputAdornmentToggle />
            </PasswordInput>
            <FieldDescription>Please confirm your password.</FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Create account
        </Button>
      </CardFooter>
    </Card>
  );
}
