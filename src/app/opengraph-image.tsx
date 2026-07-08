import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "KRYPTA 2026 - Knowledge, Research & Yielding Parallel Technologies Arena";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f172a", // brand-900
          position: "relative",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "50%",
            height: "140%",
            background: "radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, rgba(15, 23, 42, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            right: "-10%",
            width: "60%",
            height: "140%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(15, 23, 42, 0) 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 10,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 24px",
              borderRadius: "9999px",
              border: "1px solid rgba(196, 181, 253, 0.3)",
              background: "rgba(139, 92, 246, 0.1)",
              color: "#c4b5fd",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            Coming Soon
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: 160,
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            KRYPTA
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 800,
              color: "#94a3b8", // foreground-muted
              lineHeight: 1,
              marginTop: "-20px",
            }}
          >
            2026
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 500,
              color: "#f9fafb",
              marginTop: "48px",
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            Multi-Track Hackathon
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 400,
              color: "#94a3b8",
              marginTop: "8px",
            }}
          >
            Curtin University Colombo
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
