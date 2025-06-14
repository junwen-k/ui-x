"use client";

import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  comboboxItemStyle,
} from "@/registry/new-york/ui/combobox";
import * as ComboboxPrimitive from "@/registry/new-york/ui/combobox-primitive";

const frameworks = [
  {
    icon: (
      <svg
        role="img"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Next.js</title>
        <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" />
      </svg>
    ),
    value: "next",
    label: "Next.js",
    description: "The React Framework for the Web",
  },
  {
    icon: (
      <svg
        role="img"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Astro</title>
        <path d="M8.358 20.162c-1.186-1.07-1.532-3.316-1.038-4.944.856 1.026 2.043 1.352 3.272 1.535 1.897.283 3.76.177 5.522-.678.202-.098.388-.229.608-.36.166.473.209.95.151 1.437-.14 1.185-.738 2.1-1.688 2.794-.38.277-.782.525-1.175.787-1.205.804-1.531 1.747-1.078 3.119l.044.148a3.158 3.158 0 0 1-1.407-1.188 3.31 3.31 0 0 1-.544-1.815c-.004-.32-.004-.642-.048-.958-.106-.769-.472-1.113-1.161-1.133-.707-.02-1.267.411-1.415 1.09-.012.053-.028.104-.045.165h.002zm-5.961-4.445s3.24-1.575 6.49-1.575l2.451-7.565c.092-.366.36-.614.662-.614.302 0 .57.248.662.614l2.45 7.565c3.85 0 6.491 1.575 6.491 1.575L16.088.727C15.93.285 15.663 0 15.303 0H8.697c-.36 0-.615.285-.784.727l-5.516 14.99z" />
      </svg>
    ),
    value: "astro",
    label: "Astro",
    description: "The web framework for content-driven websites",
  },
  {
    icon: (
      <svg
        role="img"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Nuxt</title>
        <path d="M13.4642 19.8295h8.9218c.2834 0 .5618-.0723.8072-.2098a1.5899 1.5899 0 0 0 .5908-.5732 1.5293 1.5293 0 0 0 .216-.783 1.529 1.529 0 0 0-.2167-.7828L17.7916 7.4142a1.5904 1.5904 0 0 0-.5907-.573 1.6524 1.6524 0 0 0-.807-.2099c-.2833 0-.5616.0724-.807.2098a1.5904 1.5904 0 0 0-.5907.5731L13.4642 9.99l-2.9954-5.0366a1.5913 1.5913 0 0 0-.591-.573 1.6533 1.6533 0 0 0-.8071-.2098c-.2834 0-.5617.0723-.8072.2097a1.5913 1.5913 0 0 0-.591.573L.2168 17.4808A1.5292 1.5292 0 0 0 0 18.2635c-.0001.2749.0744.545.216.783a1.59 1.59 0 0 0 .5908.5732c.2454.1375.5238.2098.8072.2098h5.6003c2.219 0 3.8554-.9454 4.9813-2.7899l2.7337-4.5922L16.3935 9.99l4.3944 7.382h-5.8586ZM7.123 17.3694l-3.9083-.0009 5.8586-9.8421 2.9232 4.921-1.9572 3.2892c-.7478 1.1967-1.5972 1.6328-2.9163 1.6328z" />
      </svg>
    ),
    value: "nuxt",
    label: "Nuxt.js",
    description: "The Intuitive Vue Framework",
  },
  {
    icon: (
      <svg
        role="img"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Remix</title>
        <path d="M21.511 18.508c.216 2.773.216 4.073.216 5.492H15.31c0-.309.006-.592.011-.878.018-.892.036-1.821-.109-3.698-.19-2.747-1.374-3.358-3.55-3.358H1.574v-5h10.396c2.748 0 4.122-.835 4.122-3.049 0-1.946-1.374-3.125-4.122-3.125H1.573V0h11.541c6.221 0 9.313 2.938 9.313 7.632 0 3.511-2.176 5.8-5.114 6.182 2.48.497 3.93 1.909 4.198 4.694ZM1.573 24v-3.727h6.784c1.133 0 1.379.84 1.379 1.342V24Z" />
      </svg>
    ),
    value: "remix",
    label: "Remix",
    description: "Full stack web framework focused on web standards",
  },
  {
    icon: (
      <svg
        role="img"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Svelte</title>
        <path d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z" />
      </svg>
    ),
    value: "svelte",
    label: "SvelteKit",
    description: "Web development, streamlined with Svelte",
  },
];

export default function ComboboxCustomItem() {
  return (
    <Combobox type="single">
      <ComboboxInput placeholder="Search frameworks..." />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxGroup heading="Web Frameworks">
          {frameworks.map((framework) => (
            <ComboboxPrimitive.Item
              value={framework.value}
              data-slot="combobox-item"
              className={cn(comboboxItemStyle(), "justify-between gap-4")}
              key={framework.value}
            >
              <div className="flex items-center gap-3">
                <div className="text-muted-foreground [&_svg:not([class*='size-'])]:size-5">
                  {framework.icon}
                </div>
                <div className="grid gap-0.5">
                  <ComboboxPrimitive.ItemText>
                    {framework.label}
                  </ComboboxPrimitive.ItemText>
                  <div className="text-muted-foreground line-clamp-1 text-xs">
                    {framework.description}
                  </div>
                </div>
              </div>
              <ComboboxPrimitive.ItemIndicator className="flex size-3.5 items-center justify-center">
                <CheckIcon className="size-4" />
              </ComboboxPrimitive.ItemIndicator>
            </ComboboxPrimitive.Item>
          ))}
        </ComboboxGroup>
      </ComboboxContent>
    </Combobox>
  );
}
