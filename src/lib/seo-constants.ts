// ── Site Constants ─────────────────────────────────────────────────────────────────
export const SITE_URL = "https://krypta-2026.vercel.app";
export const SITE_NAME = "KRYPTA 2026";
export const CONTACT_EMAIL = "krypta.pc.cuc@gmail.com";

// ── Organization Info ───────────────────────────────────────────────────────────────
export const ORGANIZATION = {
  name: "Programming Club - Curtin University Colombo",
  url: SITE_URL,
  description: "The Programming Club of Curtin University Colombo organizes technical competitions, hackathons, and educational events for students.",
  contactPoint: {
    email: CONTACT_EMAIL,
    contactType: "customer service",
  },
};

// ── Event Info ───────────────────────────────────────────────────────────────────────
export const EVENT_INFO = {
  name: "KRYPTA 2026",
  startDate: "2026-11-01",
  endDate: "2026-11-30",
  location: {
    name: "Curtin University Colombo",
    address: {
      streetAddress: "Nawam Mawatha",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
  },
  description: "KRYPTA 2026 is a multi-track competition featuring Buildathon and CTF tracks for university and school students.",
  url: SITE_URL,
  organizer: {
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
  },
};

// ── Track Information ───────────────────────────────────────────────────────────────
export const TRACKS = {
  buildathon: {
    name: "Buildathon Track",
    description: "A product-building competition where teams design, develop, and present functional software solutions.",
    teamCap: 50,
    teamSize: { min: 3, max: 4 },
  },
  ctf: {
    name: "Capture The Flag (CTF) Track",
    description: "A cybersecurity competition featuring challenges in cryptography, web exploitation, reverse engineering, and forensics.",
    teamCap: 25,
    teamSize: { min: 3, max: 4 },
  },
  students: {
    name: "School Students Section",
    description: "A special track for school students with workshops and beginner-friendly challenges.",
    teamCap: 10,
    teamSize: { min: 3, max: 4 },
  },
};

// ── Key Dates ───────────────────────────────────────────────────────────────────────
export const KEY_DATES = {
  registrationOpens: "2026-09-01",
  primaryRoundsStart: "2026-11-01",
  finals: "2026-11-25",
};

// ── Social Media ───────────────────────────────────────────────────────────────────
export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/krypta.cuc",
  linkedin: "https://linkedin.com/company/krypta-cuc",
  facebook: "https://facebook.com/krypta.cuc",
};
