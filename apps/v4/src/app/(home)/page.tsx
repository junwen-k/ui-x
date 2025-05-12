import { ComponentDemoCarouselSection } from "@/components/component-demo-carousel-section";
import { HeroSection } from "@/components/hero-section";
import { KeyFeaturesSection } from "@/components/key-features-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ComponentDemoCarouselSection />
      <KeyFeaturesSection />
    </div>
  );
}
