import { Info, Mail } from "lucide-react";

import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";

export default function InputBaseDisabled() {
  return (
    <InputBase disabled>
      <InputBaseAdornment>
        <Mail />
      </InputBaseAdornment>
      <InputBaseControl>
        <InputBaseInput type="email" placeholder="Email" />
      </InputBaseControl>
      <InputBaseAdornment>
        <InputBaseAdornmentButton>
          <Info />
        </InputBaseAdornmentButton>
      </InputBaseAdornment>
    </InputBase>
  );
}
