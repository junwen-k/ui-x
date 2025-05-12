"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { MonitorIcon, MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { cn } from "@/lib/utils";

const THEME_OPTIONS = [
  {
    icon: <MoonStarIcon />,
    value: "dark",
  },
  {
    icon: <SunIcon />,
    value: "light",
  },
  {
    icon: <MonitorIcon />,
    value: "system",
  },
] as const;

export function ModeSwitcher({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="flex h-8 w-24" />;
  }

  return (
    <RadioGroupPrimitive.Root
      value={theme}
      onValueChange={setTheme}
      className={cn(
        "bg-muted inline-flex items-center rounded-full border p-1",
        className,
      )}
      {...props}
    >
      {THEME_OPTIONS.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            "inline-flex items-center justify-center rounded-full p-1 transition-colors outline-none [&_svg:not([class*='size-'])]:size-3.5",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            "data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground data-[state=checked]:border-border border border-transparent",
            "focus-visible:ring-ring focus-visible:ring-1",
          )}
        >
          {option.icon}
          <span className="sr-only">{`Switch to ${option.value} theme`}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
