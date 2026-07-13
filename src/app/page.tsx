import type { Metadata } from "next";
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
import { JsonLdEvent } from "@/components/seo/JsonLdEvent";
import { JsonLdOrganization } from "@/components/seo/JsonLdOrganization";
import { generateMetadata } from "@/lib/metadata";
import { EVENT_INFO, ORGANIZATION } from "@/lib/seo-constants";

export const metadata: Metadata = generateMetadata({
  title: "Home",
  description:
    "KRYPTA 2026 - A multi-track competition featuring Buildathon and CTF tracks for university and school students. Registration opens September 2026. Finals in November 2026 at Curtin University Colombo.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLdEvent
        name={EVENT_INFO.name}
        startDate={EVENT_INFO.startDate}
        endDate={EVENT_INFO.endDate}
        location={EVENT_INFO.location}
        description={EVENT_INFO.description}
        url={EVENT_INFO.url}
        organizer={EVENT_INFO.organizer}
      />
      <JsonLdOrganization
        name={ORGANIZATION.name}
        url={ORGANIZATION.url}
        description={ORGANIZATION.description}
        contactPoint={ORGANIZATION.contactPoint}
      />
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
