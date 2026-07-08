import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KRYPTA 2026",
    short_name: "KRYPTA",
    description:
      "Knowledge, Research & Yielding Parallel Technologies Arena - Multi-Track Hackathon by Programming Club of Curtin University Colombo.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/logo/krypta-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/krypta-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
