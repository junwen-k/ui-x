import { Registry } from "@/registry/schema"

export const ui: Registry = [
  // {
  //   name: "accordion",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-accordion"],
  //   files: ["ui/accordion.tsx"],
  //   tailwind: {
  //     config: {
  //       theme: {
  //         extend: {
  //           keyframes: {
  //             "accordion-down": {
  //               from: { height: "0" },
  //               to: { height: "var(--radix-accordion-content-height)" },
  //             },
  //             "accordion-up": {
  //               from: { height: "var(--radix-accordion-content-height)" },
  //               to: { height: "0" },
  //             },
  //           },
  //           animation: {
  //             "accordion-down": "accordion-down 0.2s ease-out",
  //             "accordion-up": "accordion-up 0.2s ease-out",
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // {
  //   name: "alert",
  //   type: "registry:ui",
  //   files: ["ui/alert.tsx"],
  // },
  // {
  //   name: "alert-dialog",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-alert-dialog"],
  //   registryDependencies: ["button"],
  //   files: ["ui/alert-dialog.tsx"],
  // },
  // {
  //   name: "aspect-ratio",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-aspect-ratio"],
  //   files: ["ui/aspect-ratio.tsx"],
  // },
  // {
  //   name: "avatar",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-avatar"],
  //   files: ["ui/avatar.tsx"],
  // },
  // {
  //   name: "badge",
  //   type: "registry:ui",
  //   files: ["ui/badge.tsx"],
  // },
  // {
  //   name: "breadcrumb",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-slot"],
  //   files: ["ui/breadcrumb.tsx"],
  // },
  // {
  //   name: "button",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-slot"],
  //   files: ["ui/button.tsx"],
  // },
  {
    name: "calendar",
    type: "registry:ui",
    dependencies: ["react-day-picker", "date-fns"],
    registryDependencies: ["button", "select"],
    files: ["ui/calendar.tsx"],
  },
  {
    name: "combobox-primitive",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/primitive",
      "@radix-ui/react-compose-refs",
      "@radix-ui/react-popover",
      "@radix-ui/react-primitive",
      "@radix-ui/react-roving-focus",
      "@radix-ui/react-use-controllable-state",
      "cmdk",
    ],
    files: ["ui/combobox-primitive.tsx"],
  },
  {
    name: "combobox",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-slot"],
    registryDependencies: ["badge", "combobox-primitive", "input-base"],
    files: ["ui/combobox-primitive.tsx"],
  },
  // {
  //   name: "card",
  //   type: "registry:ui",
  //   files: ["ui/card.tsx"],
  // },
  // {
  //   name: "carousel",
  //   type: "registry:ui",
  //   files: ["ui/carousel.tsx"],
  //   registryDependencies: ["button"],
  //   dependencies: ["embla-carousel-react"],
  // },
  // {
  //   name: "chart",
  //   type: "registry:ui",
  //   files: ["ui/chart.tsx"],
  //   registryDependencies: ["card"],
  //   dependencies: ["recharts", "lucide-react"],
  // },
  // {
  //   name: "checkbox",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-checkbox"],
  //   files: ["ui/checkbox.tsx"],
  // },
  // {
  //   name: "collapsible",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-collapsible"],
  //   files: ["ui/collapsible.tsx"],
  // },
  // {
  //   name: "command",
  //   type: "registry:ui",
  //   dependencies: ["cmdk@1.0.0"],
  //   registryDependencies: ["dialog"],
  //   files: ["ui/command.tsx"],
  // },
  // {
  //   name: "context-menu",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-context-menu"],
  //   files: ["ui/context-menu.tsx"],
  // },
  {
    name: "date-field",
    type: "registry:ui",
    registryDependencies: ["date-time-field"],
    files: ["ui/date-field.tsx"],
  },
  {
    name: "date-time-field-primitive",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-compose-refs",
      "@radix-ui/react-primitive",
      "@radix-ui/react-use-controllable-state",
      "timescape",
    ],
    files: [
      {
        path: "ui/date-time-field-primitive.tsx",
        type: "registry:ui",
      },
      {
        path: "hooks/use-timescape.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "date-time-range-field-primitive",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/react-compose-refs",
      "@radix-ui/react-primitive",
      "@radix-ui/react-use-controllable-state",
      "timescape",
    ],
    files: [
      {
        path: "ui/date-time-range-field-primitive.tsx",
        type: "registry:ui",
      },
      {
        path: "hooks/use-timescape.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "date-time-field",
    type: "registry:ui",
    registryDependencies: ["date-time-field-primitive", "input-base"],
    files: ["ui/date-time-field-primitive.tsx"],
  },
  {
    name: "date-time-range-field",
    type: "registry:ui",
    registryDependencies: ["date-time-range-field-primitive"],
    files: ["ui/date-time-range-field.tsx"],
  },
  {
    name: "date-picker-primitive",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/primitive",
      "@radix-ui/react-popover",
      "@radix-ui/react-primitive",
      "@radix-ui/react-slot",
      "@radix-ui/react-use-controllable-state",
      "date-fns",
      "react-day-picker",
    ],
    registryDependencies: ["date-time-field-primitive"],
    files: ["ui/date-picker-primitive.tsx"],
  },
  {
    name: "date-picker",
    type: "registry:ui",
    registryDependencies: [
      "button",
      "calendar",
      "date-picker-primitive",
      "input-base",
    ],
    files: ["ui/date-picker.tsx"],
  },
  {
    name: "description-list",
    type: "registry:ui",
    files: ["ui/description-list.tsx"],
  },
  // {
  //   name: "dialog",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-dialog"],
  //   files: ["ui/dialog.tsx"],
  // },
  // {
  //   name: "drawer",
  //   type: "registry:ui",
  //   dependencies: ["vaul", "@radix-ui/react-dialog"],
  //   files: ["ui/drawer.tsx"],
  // },
  // {
  //   name: "dropdown-menu",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-dropdown-menu"],
  //   files: ["ui/dropdown-menu.tsx"],
  // },
  {
    name: "dropzone-primitive",
    type: "registry:ui",
    dependencies: [
      "@radix-ui/primitive",
      "@radix-ui/react-primitive",
      "react-dropzone",
    ],
    files: ["ui/dropzone-primitive.tsx"],
  },
  {
    name: "dropzone",
    type: "registry:ui",
    dependencies: ["@radix-ui/react-primitive"],
    registryDependencies: ["dropzone-primitive"],
    files: ["ui/dropzone.tsx"],
  },
  // {
  //   name: "form",
  //   type: "registry:ui",
  //   dependencies: [
  //     "@radix-ui/react-label",
  //     "@radix-ui/react-slot",
  //     "@hookform/resolvers",
  //     "zod",
  //     "react-hook-form",
  //   ],
  //   registryDependencies: ["button", "label"],
  //   files: ["ui/form.tsx"],
  // },
  // {
  //   name: "hover-card",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-hover-card"],
  //   files: ["ui/hover-card.tsx"],
  // },
  // {
  //   name: "input",
  //   type: "registry:ui",
  //   files: ["ui/input.tsx"],
  // },
  {
    name: "file-list",
    type: "registry:ui",
    dependencies: ["pretty-bytes"],
    registryDependencies: ["button", "progress"],
    files: ["ui/file-list.tsx"],
  },
  {
    name: "input-base",
    type: "registry:ui",
    files: ["ui/input-base.tsx"],
  },
  {
    name: "time-field",
    type: "registry:ui",
    registryDependencies: ["date-time-field"],
    files: ["ui/time-field.tsx"],
  },
  {
    name: "time",
    type: "registry:ui",
    dependencies: ["date-fns"],
    files: ["ui/time.tsx"],
  },
  {
    name: "timeline",
    type: "registry:ui",
    files: ["ui/timeline.tsx"],
  },
  // {
  //   name: "input-otp",
  //   type: "registry:ui",
  //   dependencies: ["input-otp"],
  //   files: ["ui/input-otp.tsx"],
  // },
  // {
  //   name: "label",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-label"],
  //   files: ["ui/label.tsx"],
  // },
  // {
  //   name: "menubar",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-menubar"],
  //   files: ["ui/menubar.tsx"],
  // },
  // {
  //   name: "navigation-menu",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-navigation-menu"],
  //   files: ["ui/navigation-menu.tsx"],
  // },
  // {
  //   name: "pagination",
  //   type: "registry:ui",
  //   registryDependencies: ["button"],
  //   files: ["ui/pagination.tsx"],
  // },
  // {
  //   name: "popover",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-popover"],
  //   files: ["ui/popover.tsx"],
  // },
  // {
  //   name: "progress",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-progress"],
  //   files: ["ui/progress.tsx"],
  // },
  // {
  //   name: "radio-group",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-radio-group"],
  //   files: ["ui/radio-group.tsx"],
  // },
  // {
  //   name: "resizable",
  //   type: "registry:ui",
  //   dependencies: ["react-resizable-panels"],
  //   files: ["ui/resizable.tsx"],
  // },
  // {
  //   name: "scroll-area",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-scroll-area"],
  //   files: ["ui/scroll-area.tsx"],
  // },
  // {
  //   name: "select",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-select"],
  //   files: ["ui/select.tsx"],
  // },
  // {
  //   name: "separator",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-separator"],
  //   files: ["ui/separator.tsx"],
  // },
  // {
  //   name: "sheet",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-dialog"],
  //   files: ["ui/sheet.tsx"],
  // },
  // {
  //   name: "skeleton",
  //   type: "registry:ui",
  //   files: ["ui/skeleton.tsx"],
  // },
  // {
  //   name: "slider",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-slider"],
  //   files: ["ui/slider.tsx"],
  // },
  // {
  //   name: "sonner",
  //   type: "registry:ui",
  //   dependencies: ["sonner", "next-themes"],
  //   files: ["ui/sonner.tsx"],
  // },
  // {
  //   name: "switch",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-switch"],
  //   files: ["ui/switch.tsx"],
  // },
  // {
  //   name: "table",
  //   type: "registry:ui",
  //   files: ["ui/table.tsx"],
  // },
  // {
  //   name: "tabs",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-tabs"],
  //   files: ["ui/tabs.tsx"],
  // },
  // {
  //   name: "textarea",
  //   type: "registry:ui",
  //   files: ["ui/textarea.tsx"],
  // },
  // {
  //   name: "toast",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-toast"],
  //   files: [
  //     {
  //       path: "ui/toast.tsx",
  //       type: "registry:ui",
  //     },
  //     {
  //       path: "hooks/use-toast.ts",
  //       type: "registry:hook",
  //     },
  //     {
  //       path: "ui/toaster.tsx",
  //       type: "registry:ui",
  //     },
  //   ],
  // },
  // {
  //   name: "toggle",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-toggle"],
  //   files: ["ui/toggle.tsx"],
  // },
  // {
  //   name: "toggle-group",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-toggle-group"],
  //   registryDependencies: ["toggle"],
  //   files: ["ui/toggle-group.tsx"],
  // },
  // {
  //   name: "tooltip",
  //   type: "registry:ui",
  //   dependencies: ["@radix-ui/react-tooltip"],
  //   files: ["ui/tooltip.tsx"],
  // },
]
