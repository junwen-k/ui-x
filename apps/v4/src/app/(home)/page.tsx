import { ComponentDemoCarouselSection } from "@/components/component-demo-carousel-section";
import { HeroSection } from "@/components/hero-section";
import { KeyFeaturesSection } from "@/components/key-features-section";

// function GuidesSection() {
//   return (
//     <section className="py-24">
//       <div className="container mx-auto grid gap-12 md:grid-cols-2">
//         <div>Left Graphic...</div>
//         <div className="grid gap-12">
//           <div className="grid gap-2">
//             <h4 className="from-foreground to-muted-foreground bg-gradient-to-b bg-clip-text text-3xl font-bold tracking-tighter text-balance text-transparent">
//               Opinionated guides for modern React development
//             </h4>
//             <p className="text-muted-foreground leading-relaxed">
//               Beyond components, we provide thoughtfully curated guides and best
//               practices for building robust React applications. From state
//               management to data fetching, learn how to leverage modern tools
//               effectively.
//             </p>
//           </div>
//           <div className="grid gap-8">
//             <div className="grid gap-2">
//               <h5 className="text-lg font-semibold tracking-tight">
//                 Self-documenting components
//               </h5>
//               <p className="text-muted-foreground text-sm leading-relaxed">
//                 Each component comes with comprehensive documentation and usage
//                 examples, making it easy to understand implementation patterns
//                 and best practices.
//               </p>
//             </div>
//             <div className="grid gap-2">
//               <h5 className="text-lg font-semibold tracking-tight">
//                 Modern development patterns
//               </h5>
//               <p className="text-muted-foreground text-sm leading-relaxed">
//                 Learn how to integrate with popular tools like React Query,
//                 handle form state, manage authentication flows, and implement
//                 other common patterns in modern web applications.
//               </p>
//             </div>
//             <div className="grid gap-2">
//               <h5 className="text-lg font-semibold tracking-tight">
//                 Extensible architecture
//               </h5>
//               <p className="text-muted-foreground text-sm leading-relaxed">
//                 Discover patterns for extending and customizing components while
//                 maintaining clean architecture and code organization principles.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ComponentDemoCarouselSection />
      <KeyFeaturesSection />
    </div>
  );
}
