import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title") || "Purnabrata Dey";
    const subtitle = searchParams.get("subtitle") || "Full-Stack Engineer";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#09090b", // Dark theme
            padding: "80px",
            border: "12px solid #d4843e", // Accent border
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Subtle grid pattern background */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#ff5f56",
              }}
            />
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#ffd93d",
              }}
            />
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: "#27c93f",
              }}
            />
            <span
              style={{
                color: "#71717a",
                fontFamily: "monospace",
                fontSize: "20px",
                marginLeft: "8px",
              }}
            >
              coderpurna.me
            </span>
          </div>

          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "#ffffff",
              margin: "0 0 20px 0",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "28px",
              color: "#d4843e",
              fontFamily: "monospace",
              margin: 0,
            }}
          >
            {subtitle}
          </p>

          <div
            style={{
              position: "absolute",
              bottom: "80px",
              right: "80px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="6"
                y="6"
                width="88"
                height="88"
                rx="8"
                fill="#ffd93d"
                stroke="#000000"
                strokeWidth="6"
              />
              <path
                d="M25 35 L40 50 L25 65"
                stroke="#000000"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="50"
                y1="65"
                x2="75"
                y2="65"
                stroke="#000000"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
            <span
              style={{
                color: "#ffffff",
                fontFamily: "monospace",
                fontSize: "24px",
                fontWeight: "bold",
                marginLeft: "12px",
              }}
            >
              coderpurna
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
}
