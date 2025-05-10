import { Info, Mail } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InputBase,
  InputBaseAdornment,
  InputBaseAdornmentButton,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";

export default function InputBaseWithAction() {
  return (
    <InputBase>
      <InputBaseAdornment>
        <Mail />
      </InputBaseAdornment>
      <InputBaseControl>
        <InputBaseInput type="email" placeholder="Email" />
      </InputBaseControl>
      <TooltipProvider>
        <Tooltip>
          <InputBaseAdornment>
            <InputBaseAdornmentButton asChild>
              <TooltipTrigger>
                <Info />
              </TooltipTrigger>
            </InputBaseAdornmentButton>
          </InputBaseAdornment>
          <TooltipContent>
            <p>Email must be unique.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </InputBase>
  );
}
