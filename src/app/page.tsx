import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { WhatToExpectSection } from "@/components/sections/WhatToExpectSection";
import { CompetitionFocusSection } from "@/components/sections/CompetitionFocusSection";
import { WhyParticipateSection } from "@/components/sections/WhyParticipateSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { OrganizedBySection } from "@/components/sections/OrganizedBySection";
import { StayUpdatedSection } from "@/components/sections/StayUpdatedSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <AboutSection />
        <VisionSection />
        <WhatToExpectSection />
        <CompetitionFocusSection />
        <WhyParticipateSection />
        <TimelineSection />
        <OrganizedBySection />
        <StayUpdatedSection />
      </main>
      <Footer />
    </>
  );
}
