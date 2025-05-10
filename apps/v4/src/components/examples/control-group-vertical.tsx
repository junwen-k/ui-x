import { BadgeCheck, CreditCard } from "lucide-react"

import {
  ControlGroup,
  ControlGroupItem,
} from "@/registry/new-york/ui/control-group"
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base"

export default function ControlGroupVertical() {
  return (
    <ControlGroup orientation="vertical">
      <ControlGroupItem>
        <ControlGroup>
          <ControlGroupItem className="flex-1 first:rounded-es-none last:rounded-ee-none">
            <InputBase>
              <InputBaseControl>
                <InputBaseInput placeholder="Name on Card" />
              </InputBaseControl>
            </InputBase>
          </ControlGroupItem>
          <ControlGroupItem className="first:rounded-es-none last:rounded-ee-none">
            <InputBase>
              <InputBaseAdornment>
                <BadgeCheck />
              </InputBaseAdornment>
            </InputBase>
          </ControlGroupItem>
        </ControlGroup>
      </ControlGroupItem>
      <ControlGroupItem>
        <InputBase>
          <InputBaseControl>
            <InputBaseInput placeholder="Card Number" />
          </InputBaseControl>
          <InputBaseAdornment>
            <CreditCard />
          </InputBaseAdornment>
        </InputBase>
      </ControlGroupItem>
      <ControlGroupItem>
        <ControlGroup>
          <ControlGroupItem className="first:rounded-ss-none last:rounded-se-none">
            <InputBase>
              <InputBaseControl>
                <InputBaseInput placeholder="MM/YY" />
              </InputBaseControl>
            </InputBase>
          </ControlGroupItem>
          <ControlGroupItem className="first:rounded-ss-none last:rounded-se-none">
            <InputBase>
              <InputBaseControl>
                <InputBaseInput placeholder="CVV" />
              </InputBaseControl>
            </InputBase>
          </ControlGroupItem>
        </ControlGroup>
      </ControlGroupItem>
    </ControlGroup>
  )
}
