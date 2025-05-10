import Link from "next/link";

import { Announcement } from "@/components/announcement";
import { CircleDecorator } from "@/components/circle-decorator";
import {
  HorizontalLineDecorator,
  VerticalLineDecorator,
} from "@/components/line-decorator";
import { StarGitHubButton } from "@/components/star-github-button";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="container mx-auto py-24">
      <div className="py-6 lg:py-8">
        <div className="flex items-center justify-center py-6 md:hidden">
          <Announcement />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative hidden min-w-[28rem] items-center justify-center p-8 md:flex">
            <VerticalLineDecorator
              lineFadeStop={50}
              className="absolute left-0 [animation-duration:0.5s]"
            />
            <Announcement />
            <VerticalLineDecorator
              lineFadeStop={50}
              className="absolute right-0 [animation-duration:0.5s]"
            />
          </div>
        </div>
        <div className="relative isolate text-center">
          <HorizontalLineDecorator
            lineOffset={150}
            className="absolute -top-px"
          />
          <CircleDecorator className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 delay-500" />
          <VerticalLineDecorator
            lineOffset={150}
            className="absolute -left-px"
          />
          <div className="bg-background relative z-10 flex items-center justify-center p-8">
            <h1 className="from-foreground to-muted-foreground bg-gradient-to-b bg-clip-text text-4xl leading-tight font-bold tracking-tighter text-balance text-transparent sm:text-5xl md:text-7xl lg:leading-[1.1]">
              Supercharge your component library
            </h1>
            <HorizontalLineDecorator
              lineOffset={150}
              className="absolute bottom-0 delay-100"
            />
          </div>
          <div className="bg-background relative z-10 flex items-center justify-center p-8">
            <p className="text-muted-foreground max-w-screen-md text-sm font-light text-balance md:text-lg">
              <span className="text-foreground font-medium">Additional</span>{" "}
              beautifully designed components that you can copy and paste into
              your apps. Accessible. Customizable. Open Source.
            </p>
            <HorizontalLineDecorator
              lineOffset={150}
              className="absolute bottom-0 delay-150"
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="relative flex flex-wrap items-center justify-center gap-4 p-8">
              <VerticalLineDecorator
                lineOffset={150}
                className="absolute left-0 hidden delay-300 [animation-duration:0.5s] md:block"
              />
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/docs">Get Started</Link>
              </Button>
              <StarGitHubButton className="w-full sm:w-auto" />
              <VerticalLineDecorator
                lineOffset={150}
                className="absolute right-0 hidden delay-300 [animation-duration:0.5s] md:block"
              />
            </div>
          </div>
          <HorizontalLineDecorator
            lineOffset={150}
            className="absolute bottom-0 delay-200"
          />
          <VerticalLineDecorator
            lineOffset={150}
            className="absolute -right-px"
          />
        </div>
      </div>
    </section>
  );
}
