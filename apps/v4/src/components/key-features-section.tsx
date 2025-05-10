import {
  BrainCircuitIcon,
  PackageOpenIcon,
  PuzzleIcon,
  SparklesIcon,
} from "lucide-react";

import { CardWithForm } from "@/components/card-demo-form";
import {
  HorizontalLineDecorator,
  VerticalLineDecorator,
} from "@/components/line-decorator";

export function KeyFeaturesSection() {
  return (
    <section className="bg-card border-y py-40 inset-shadow-sm">
      <div className="container mx-auto grid items-center gap-24 md:grid-cols-2">
        <div className="grid gap-12">
          <div className="flex flex-col gap-2">
            <h4 className="from-foreground to-muted-foreground bg-gradient-to-b bg-clip-text text-3xl font-bold tracking-tighter text-balance text-transparent">
              Everything you need. Open by design.
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              A thoughtfully crafted extension that provides additional
              components while maintaining the same principles of being open,
              composable and customizable.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {[
              {
                icon: SparklesIcon,
                title: "Intuitive Developer Experience",
                description:
                  "Each component's API mirrors Radix UI conventions and shadcn/ui patterns, creating an intuitive and familiar experience.",
              },
              {
                icon: PuzzleIcon,
                title: "Natural Extension",
                description:
                  "Components are thoughtfully designed to feel like natural additions to the shadcn/ui ecosystem, maintaining quality and coherence.",
              },
              {
                icon: PackageOpenIcon,
                title: "Open and Customizable",
                description:
                  "Like shadcn/ui, you have full access to the component code, allowing complete customization to fit your needs.",
              },
              {
                icon: BrainCircuitIcon,
                title: "AI-Ready",
                description:
                  "Components are designed to be compatible with AI tools like v0, enabling seamless integration with AI-powered workflows.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div key={title} className="grid gap-6">
                <div className="grid gap-2">
                  <h5 className="flex items-center gap-2 text-sm font-semibold tracking-tight">
                    <Icon className="size-5" />
                    {title}
                  </h5>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <HorizontalLineDecorator
            lineOffset={100}
            className="absolute top-0"
          />
          <VerticalLineDecorator lineOffset={100} className="absolute left-0" />
          <div className="shadow-xl">
            <CardWithForm />
          </div>
          <HorizontalLineDecorator
            lineOffset={100}
            className="absolute bottom-0"
          />
          <VerticalLineDecorator
            lineOffset={100}
            className="absolute right-0"
          />
        </div>
      </div>
    </section>
  );
}
