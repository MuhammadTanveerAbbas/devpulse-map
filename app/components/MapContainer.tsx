"use client";

import dynamic from "next/dynamic";

// ─── Themed map loader ────────────────────────────────────────────────────────

function MapLoader() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "1000 / 480",
        background: "var(--ds-background-200)",
      }}
    >
      {/* Grid lines */}
      <svg
        viewBox="0 0 1000 480"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
        preserveAspectRatio="none"
      >
        {/* Horizontal lines */}
        {[60, 120, 180, 240, 300, 360, 420].map(y => (
          <line key={`h${y}`} x1={0} y1={y} x2={1000} y2={y} stroke="#00ff88" strokeWidth={0.5} />
        ))}
        {/* Vertical lines */}
        {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(x => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={480} stroke="#00ff88" strokeWidth={0.5} />
        ))}
        {/* Equator */}
        <line x1={0} y1={240} x2={1000} y2={240} stroke="#00ff88" strokeWidth={1} strokeDasharray="4 4" />
        {/* Prime meridian */}
        <line x1={500} y1={0} x2={500} y2={480} stroke="#00ff88" strokeWidth={1} strokeDasharray="4 4" />
      </svg>

      {/* Shimmer overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(0,255,136,0.04) 50%, transparent 100%)",
          animation: "mapShimmer 2s ease-in-out infinite",
        }}
      />

      {/* Scan line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 2,
          background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)",
          animation: "mapScan 2.5s linear infinite",
          boxShadow: "0 0 12px rgba(0,255,136,0.4)",
        }}
      />

      {/* Dot grid placeholder */}
      <svg
        viewBox="0 0 1000 480"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}
      >
        {Array.from({ length: 26 }, (_, row) =>
          Array.from({ length: 55 }, (_, col) => (
            <rect
              key={`${row}-${col}`}
              x={col * 18 + 5}
              y={row * 18 + 5}
              width={3}
              height={3}
              fill="#00ff88"
            />
          ))
        )}
      </svg>

      {/* Center status */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        {/* Radar ring */}
        <div style={{ position: "relative", width: 64, height: 64 }}>
          <div style={{
            position: "absolute", inset: 0, borderRadius: "50%",
            border: "1px solid rgba(0,255,136,0.3)",
            animation: "radarPing 1.5s ease-out infinite",
          }} />
          <div style={{
            position: "absolute", inset: 8, borderRadius: "50%",
            border: "1px solid rgba(0,255,136,0.5)",
            animation: "radarPing 1.5s ease-out infinite 0.4s",
          }} />
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="#00ff88" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                stroke="#00ff88" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
              <path d="M12 6v6l4 2" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
            </svg>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#00ff88",
            marginBottom: 4,
          }}>
            Initializing Map
          </div>
          <div style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            color: "rgba(144,144,176,0.7)",
            letterSpacing: "0.08em",
          }}>
            Loading developer activity data...
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: 160,
          height: 2,
          background: "rgba(0,255,136,0.1)",
          borderRadius: 1,
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #00ff88, #00d4ff)",
            borderRadius: 1,
            animation: "mapProgress 1.8s ease-in-out infinite",
          }} />
        </div>
      </div>

      {/* Corner decorations */}
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute",
          ...pos,
          width: 16,
          height: 16,
          borderTop: i < 2 ? "1px solid rgba(0,255,136,0.4)" : undefined,
          borderBottom: i >= 2 ? "1px solid rgba(0,255,136,0.4)" : undefined,
          borderLeft: i % 2 === 0 ? "1px solid rgba(0,255,136,0.4)" : undefined,
          borderRight: i % 2 === 1 ? "1px solid rgba(0,255,136,0.4)" : undefined,
        }} />
      ))}
    </div>
  );
}

// ─── Dynamic import  SSR disabled ───────────────────────────────────────────

const DottedMap = dynamic(() => import("./DottedMap"), {
  ssr: false,
  loading: () => <MapLoader />,
});

export default function MapContainer() {
  return <DottedMap />;
}
