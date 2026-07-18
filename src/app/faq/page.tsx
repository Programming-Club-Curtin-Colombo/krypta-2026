import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLdFAQPage } from "@/components/seo/JsonLdFAQPage";
import { generateMetadata } from "@/lib/metadata";

const FAQS = [
  {
    question: "What is KRYPTA 2026?",
    answer: "KRYPTA 2026 is a multi-track technical competition organized by the Programming Club of Curtin University Colombo. It features Buildathon and Capture The Flag (CTF) tracks for university and school students.",
  },
  {
    question: "When is KRYPTA 2026 taking place?",
    answer: "Registration opens September 1st, 2026 and closes September 30th, 2026. The finals will be held November 28-29, 2026 at Curtin University Colombo.",
  },
  {
    question: "Who can participate in KRYPTA 2026?",
    answer: "KRYPTA 2026 is open to university students and school students. Participants must be at least 18 years old, or have written parental/guardian consent if under 18. Organizers, judges, mentors, and their immediate family members are not eligible to compete.",
  },
  {
    question: "What are the competition tracks?",
    answer: "KRYPTA 2026 features three tracks: Buildathon (product-building competition with 45 teams cap), Capture The Flag (CTF) cybersecurity competition with 20 teams cap), and a School Students section (10 teams cap).",
  },
  {
    question: "What is the team size for each track?",
    answer: "All tracks require teams of 3-4 members. Participants must form their own teams before registration.",
  },
  {
    question: "Where will the competition be held?",
    answer: "The finals will be held on-site at Curtin University Colombo, Nawam Mawatha, Colombo, Sri Lanka. {/* Preliminary rounds will be conducted online. */}",
  },
  {
    question: "How do I register for KRYPTA 2026?",
    answer: "Registration opens September 1st, 2026 through the official website and will be open throughout September. You will need to form a team (3-4 members), select your track, provide eligibility verification, and consent to the terms and conditions.",
  },
  {
    question: "Is there a registration fee?",
    answer: "Registration details including any fees will be announced when registration opens in September 2026. Please check the official website for the most up-to-date information.",
  },
  {
    question: "What prizes are available?",
    answer: "Winning teams in each track will receive cash prizes. All participants who complete the competition will receive certificates of participation.",
  },
  {
    question: "Are workshops available?",
    answer: "Yes, dedicated workshops are available for school students to help them prepare for the competition. Support workshops are also available for university participants.",
  },
  {
    question: "What should I bring to the on-site finals?",
    answer: "Participants should bring their own laptops, chargers, and any other personal equipment they need. A detailed list of permitted equipment will be provided with the registration details.",
  },
  {
    question: "Can I participate in multiple tracks?",
    answer: "Participants can only register for one track to ensure fair competition and proper resource allocation.",
  },
];

export const metadata: Metadata = generateMetadata({
  title: "FAQ",
  description:
    "Frequently asked questions about KRYPTA 2026 - registration, eligibility, tracks, prizes, and competition details.",
  path: "/faq",
});

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-[var(--color-border)] last:border-0">
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
        {question}
      </h3>
      <p className="text-sm text-[var(--color-foreground-muted)] leading-relaxed">
        {answer}
      </p>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <JsonLdFAQPage faqs={FAQS} />
      <Navbar />
      <main id="main-content" className="container-xl py-16 max-w-3xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: "FAQ", href: "/faq" },
            ]}
            className="mb-6"
          />
        </div>
        <div className="mb-12">
          <p
            className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[var(--color-foreground)] mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-base text-[var(--color-foreground-muted)] leading-relaxed">
            Find answers to common questions about KRYPTA 2026, registration, eligibility, and competition details.
          </p>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)]">
          <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
            Still have questions?
          </h3>
          <p className="text-sm text-[var(--color-foreground-muted)] mb-4">
            If you couldn&apos;t find the answer you&apos;re looking for, feel free to contact us directly.
          </p>
          <a
            href="mailto:krypta.pc.cuc@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Contact Us
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
