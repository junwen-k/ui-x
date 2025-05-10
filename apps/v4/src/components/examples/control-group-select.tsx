import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ControlGroup,
  ControlGroupItem,
} from "@/registry/new-york/ui/control-group";
import {
  InputBase,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";

export default function ControlGroupSelect() {
  return (
    <ControlGroup>
      <ControlGroupItem>
        <InputBase>
          <InputBaseControl>
            <InputBaseInput
              type="number"
              placeholder="Amount"
              min={0}
              step={0.01}
            />
          </InputBaseControl>
        </InputBase>
      </ControlGroupItem>
      <Select defaultValue="USD">
        <ControlGroupItem>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Currency" />
          </SelectTrigger>
        </ControlGroupItem>
        <SelectContent align="end">
          <SelectItem value="EUR">€ EUR</SelectItem>
          <SelectItem value="GBP">£ GBP</SelectItem>
          <SelectItem value="JPY">¥ JPY</SelectItem>
          <SelectItem value="USD">$ USD</SelectItem>
          <SelectItem value="CNY">¥ CNY</SelectItem>
          <SelectItem value="SGD">S$ SGD</SelectItem>
        </SelectContent>
      </Select>
    </ControlGroup>
  );
}
