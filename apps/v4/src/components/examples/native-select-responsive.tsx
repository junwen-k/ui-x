"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  NativeSelect,
  NativeSelectGroup,
  NativeSelectOption,
  NativeSelectPlaceholder,
} from "@/registry/new-york/ui/native-select";

export default function NativeSelectResponsive() {
  const [value, setValue] = React.useState("");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>North America</SelectLabel>
            <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
            <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
            <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
            <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
            <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
            <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Europe & Africa</SelectLabel>
            <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
            <SelectItem value="cet">Central European Time (CET)</SelectItem>
            <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
            <SelectItem value="west">
              Western European Summer Time (WEST)
            </SelectItem>
            <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
            <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Asia</SelectLabel>
            <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
            <SelectItem value="ist">India Standard Time (IST)</SelectItem>
            <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
            <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
            <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
            <SelectItem value="ist_indonesia">
              Indonesia Central Standard Time (WITA)
            </SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Australia & Pacific</SelectLabel>
            <SelectItem value="awst">
              Australian Western Standard Time (AWST)
            </SelectItem>
            <SelectItem value="acst">
              Australian Central Standard Time (ACST)
            </SelectItem>
            <SelectItem value="aest">
              Australian Eastern Standard Time (AEST)
            </SelectItem>
            <SelectItem value="nzst">
              New Zealand Standard Time (NZST)
            </SelectItem>
            <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>South America</SelectLabel>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <NativeSelect
      value={value}
      onChange={(event) => setValue(event.target.value)}
    >
      <NativeSelectPlaceholder>Select a timezone</NativeSelectPlaceholder>
      <NativeSelectGroup label="North America">
        <NativeSelectOption value="est">
          Eastern Standard Time (EST)
        </NativeSelectOption>
        <NativeSelectOption value="cst">
          Central Standard Time (CST)
        </NativeSelectOption>
        <NativeSelectOption value="mst">
          Mountain Standard Time (MST)
        </NativeSelectOption>
        <NativeSelectOption value="pst">
          Pacific Standard Time (PST)
        </NativeSelectOption>
        <NativeSelectOption value="akst">
          Alaska Standard Time (AKST)
        </NativeSelectOption>
        <NativeSelectOption value="hst">
          Hawaii Standard Time (HST)
        </NativeSelectOption>
      </NativeSelectGroup>
      <NativeSelectGroup label="Europe & Africa">
        <NativeSelectOption value="gmt">
          Greenwich Mean Time (GMT)
        </NativeSelectOption>
        <NativeSelectOption value="cet">
          Central European Time (CET)
        </NativeSelectOption>
        <NativeSelectOption value="eet">
          Eastern European Time (EET)
        </NativeSelectOption>
        <NativeSelectOption value="west">
          Western European Summer Time (WEST)
        </NativeSelectOption>
        <NativeSelectOption value="cat">
          Central Africa Time (CAT)
        </NativeSelectOption>
        <NativeSelectOption value="eat">
          East Africa Time (EAT)
        </NativeSelectOption>
      </NativeSelectGroup>
      <NativeSelectGroup label="Asia">
        <NativeSelectOption value="msk">Moscow Time (MSK)</NativeSelectOption>
        <NativeSelectOption value="ist">
          India Standard Time (IST)
        </NativeSelectOption>
        <NativeSelectOption value="cst_china">
          China Standard Time (CST)
        </NativeSelectOption>
        <NativeSelectOption value="jst">
          Japan Standard Time (JST)
        </NativeSelectOption>
        <NativeSelectOption value="kst">
          Korea Standard Time (KST)
        </NativeSelectOption>
        <NativeSelectOption value="ist_indonesia">
          Indonesia Central Standard Time (WITA)
        </NativeSelectOption>
      </NativeSelectGroup>
      <NativeSelectGroup label="Australia & Pacific">
        <NativeSelectOption value="awst">
          Australian Western Standard Time (AWST)
        </NativeSelectOption>
        <NativeSelectOption value="acst">
          Australian Central Standard Time (ACST)
        </NativeSelectOption>
        <NativeSelectOption value="aest">
          Australian Eastern Standard Time (AEST)
        </NativeSelectOption>
        <NativeSelectOption value="nzst">
          New Zealand Standard Time (NZST)
        </NativeSelectOption>
        <NativeSelectOption value="fjt">Fiji Time (FJT)</NativeSelectOption>
      </NativeSelectGroup>
      <NativeSelectGroup label="South America">
        <NativeSelectOption value="art">
          Argentina Time (ART)
        </NativeSelectOption>
        <NativeSelectOption value="bot">Bolivia Time (BOT)</NativeSelectOption>
        <NativeSelectOption value="brt">Brasilia Time (BRT)</NativeSelectOption>
        <NativeSelectOption value="clt">
          Chile Standard Time (CLT)
        </NativeSelectOption>
      </NativeSelectGroup>
    </NativeSelect>
  );
}
