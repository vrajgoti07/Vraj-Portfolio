import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vraj Goti — Full-Stack & AI Product Engineer";
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
          width: "100%",
          height: "100%",
          backgroundColor: "#0B0B0C",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          color: "#ECE9E2",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Hairline Grid Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 100% 0%, rgba(200, 255, 61, 0.12), transparent 45%)",
          }}
        />

        {/* Header: Monogram & Location */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backgroundColor: "#131315",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                color: "#C8FF3D",
                fontSize: "20px",
                fontFamily: "monospace",
              }}
            >
              VG
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "14px",
                letterSpacing: "0.2em",
                color: "#8C8A84",
                textTransform: "uppercase",
              }}
            >
              Vraj Goti
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "monospace",
              fontSize: "13px",
              color: "#8C8A84",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#C8FF3D",
              }}
            />
            <span>Surat, Gujarat, India</span>
          </div>
        </div>

        {/* Center: Editorial Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "0.2em",
              color: "#C8FF3D",
              textTransform: "uppercase",
            }}
          >
            // Full-Stack &amp; AI Product Engineer
          </div>
          <div
            style={{
              fontSize: "68px",
              lineHeight: 1.05,
              fontWeight: 400,
              letterSpacing: "-0.03em",
              color: "#ECE9E2",
            }}
          >
            I build AI products that <span style={{ color: "#C8FF3D", fontStyle: "italic" }}>ship</span>.
          </div>
        </div>

        {/* Footer: Key Capabilities */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            fontFamily: "monospace",
            fontSize: "13px",
            color: "#8C8A84",
          }}
        >
          <span>Autonomous Voice AI · Next.js · TypeScript · FastAPI</span>
          <span style={{ color: "#C8FF3D" }}>vrajgoti.dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

