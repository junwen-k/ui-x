import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectPlaceholder,
} from "@/registry/new-york/ui/native-select";

export default function NativeSelectDemo() {
  return (
    <NativeSelect defaultValue="">
      <NativeSelectPlaceholder>Select a fruit</NativeSelectPlaceholder>
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="grapes">Grapes</NativeSelectOption>
      <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
    </NativeSelect>
  );
}
