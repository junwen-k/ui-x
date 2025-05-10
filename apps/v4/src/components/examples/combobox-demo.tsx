import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
} from "@/registry/new-york/ui/combobox";

export default function ComboboxDemo() {
  return (
    <Combobox type="single">
      <ComboboxInput placeholder="Search fruit..." />
      <ComboboxContent>
        <ComboboxEmpty>No fruit found.</ComboboxEmpty>
        <ComboboxGroup heading="Fruits">
          <ComboboxItem value="apple">Apple</ComboboxItem>
          <ComboboxItem value="banana">Banana</ComboboxItem>
          <ComboboxItem value="blueberry">Blueberry</ComboboxItem>
          <ComboboxItem value="grapes">Grapes</ComboboxItem>
          <ComboboxItem value="pineapple">Pineapple</ComboboxItem>
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  );
}
