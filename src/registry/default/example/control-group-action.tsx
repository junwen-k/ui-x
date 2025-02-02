import { Mail } from "lucide-react"

import { Button } from "@/registry/default/ui/button"
import {
  ControlGroup,
  ControlGroupItem,
} from "@/registry/default/ui/control-group"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/default/ui/input-base"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/registry/default/ui/native-select"

export default function ControlGroupAction() {
  return (
    <ControlGroup>
      <ControlGroupItem>
        <InputBase>
          <InputBaseAdornment>
            <Mail />
          </InputBaseAdornment>
          <InputBaseControl>
            <InputBaseInput type="email" placeholder="Email" />
          </InputBaseControl>
        </InputBase>
      </ControlGroupItem>
      <ControlGroupItem>
        <NativeSelect>
          <NativeSelectOption value="@gmail.com">@gmail.com</NativeSelectOption>
          <NativeSelectOption value="@outlook.com">
            @outlook.com
          </NativeSelectOption>
          <NativeSelectOption value="@yahoo.com">@yahoo.com</NativeSelectOption>
          <NativeSelectOption value="@hotmail.com">
            @hotmail.com
          </NativeSelectOption>
        </NativeSelect>
      </ControlGroupItem>
      <ControlGroupItem>
        <Button>Subscribe</Button>
      </ControlGroupItem>
    </ControlGroup>
  )
}
