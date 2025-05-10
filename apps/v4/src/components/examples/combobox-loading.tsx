import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxLoading,
} from "@/registry/new-york/ui/combobox";

export default function ComboboxLoadingDemo() {
  return (
    <Combobox type="single">
      <ComboboxInput placeholder="Search fruit..." />
      <ComboboxContent>
        <ComboboxLoading />
      </ComboboxContent>
    </Combobox>
  );
}
