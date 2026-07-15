import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const resolvedParams = await params;
  const filename = resolvedParams.filename;
  
  // Parse size from filename (e.g. icon-192x192.png -> 192)
  const is512 = filename.includes("512");
  const size = is512 ? 512 : 192;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#E53935",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
          fontWeight: "bold",
        }}
      >
        {/* Simple decorative bag shape */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: is512 ? "260px" : "100px",
            height: is512 ? "260px" : "100px",
            border: `${is512 ? 16 : 6}px solid white`,
            borderRadius: is512 ? "40px" : "16px",
            position: "relative",
          }}
        >
          {/* Handle */}
          <div
            style={{
              position: "absolute",
              top: is512 ? "-80px" : "-30px",
              width: is512 ? "120px" : "46px",
              height: is512 ? "80px" : "30px",
              border: `${is512 ? 16 : 6}px solid white`,
              borderBottom: "none",
              borderTopLeftRadius: is512 ? "60px" : "24px",
              borderTopRightRadius: is512 ? "60px" : "24px",
            }}
          />
          <span
            style={{
              fontSize: is512 ? "120px" : "48px",
              color: "white",
            }}
          >
            VSS
          </span>
        </div>
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}
