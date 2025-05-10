import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/registry/new-york/ui/input-base";

export default function InputBaseDemo() {
  return (
    <InputBase>
      <InputBaseAdornment>@</InputBaseAdornment>
      <InputBaseControl>
        <InputBaseInput placeholder="junwen-k" />
      </InputBaseControl>
    </InputBase>
  );
}
