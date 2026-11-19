import { Suspense, lazy } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { PartnersCarousel } from "@/components/landing/PartnersCarousel";
const WhatIsSection = lazy(() => import("@/components/landing/WhatIsSection").then(module => ({ default: module.WhatIsSection })));
const ReasonsSection = lazy(() => import("@/components/landing/ReasonsSection").then(module => ({ default: module.ReasonsSection })));
const LGBTQSection = lazy(() => import("@/components/landing/LGBTQSection").then(module => ({ default: module.LGBTQSection })));
const IntimateWeddingSection = lazy(() => import("@/components/landing/IntimateWeddingSection").then(module => ({ default: module.IntimateWeddingSection })));
const TimelineSection = lazy(() => import("@/components/landing/TimelineSection").then(module => ({ default: module.TimelineSection })));
const GallerySection = lazy(() => import("@/components/landing/GallerySection").then(module => ({ default: module.GallerySection })));
const AdvisorySection = lazy(() => import("@/components/landing/AdvisorySection").then(module => ({ default: module.AdvisorySection })));
const FAQSection = lazy(() => import("@/components/landing/FAQSection").then(module => ({ default: module.FAQSection })));
const PricingSection = lazy(() => import("@/components/landing/PricingSection").then(module => ({ default: module.PricingSection })));
const AboutSection = lazy(() => import("@/components/landing/AboutSection").then(module => ({ default: module.AboutSection })));
import { Footer } from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";

// Loading Fallback
const SectionLoader = () => (
  <div className="w-full py-20 px-4 flex items-center justify-center">
    <Skeleton className="h-[400px] w-full max-w-4xl rounded-xl" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        <div id="o-que-e">
          <Suspense fallback={<SectionLoader />}>
            <WhatIsSection />
          </Suspense>
        </div>

        <PartnersCarousel />

        <div id="motivos">
          <Suspense fallback={<SectionLoader />}>
            <ReasonsSection />
          </Suspense>
        </div>

        <div id="lgbtq">
          <Suspense fallback={<SectionLoader />}>
            <LGBTQSection />
          </Suspense>
        </div>

        <div id="casamento-intimo">
          <Suspense fallback={<SectionLoader />}>
            <IntimateWeddingSection />
          </Suspense>
        </div>

        <Suspense fallback={<SectionLoader />}>
          <TimelineSection />
        </Suspense>

        <div id="galeria">
          <Suspense fallback={<SectionLoader />}>
            <GallerySection />
          </Suspense>
        </div>

        <Suspense fallback={<SectionLoader />}>
          <AdvisorySection />
        </Suspense>

        <div id="faq">
          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>
        </div>

        <div id="investimento">
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
        </div>

        <div id="sobre">
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
        </div>
      </main>

      <div id="contato">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
