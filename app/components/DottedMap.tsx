"use client";

import { useMemo, memo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { geoMercator } from "d3-geo";
import dottedMapData from "../data/dotted-map-data.json";
import { devCountryActivity, devHubMarkers, formatNumber, type CountryActivity } from "../data/dev-data";

// ─── Country colors ───────────────────────────────────────────────────────────

const countryColors: Record<string, string> = {
  US: "#00ff88", IN: "#f59e0b", CN: "#ff2d55", DE: "#FFCE00",
  GB: "#3b82f6", BR: "#22c55e", CA: "#ef4444", FR: "#818cf8",
  PK: "#00d4ff", AU: "#3b82f6", JP: "#dc143c", KR: "#60a5fa",
  RU: "#f87171", NL: "#ea580c", SE: "#38bdf8", SG: "#fbbf24",
  PL: "#dc2626", ES: "#b91c1c", IT: "#16a34a", MX: "#15803d",
  AR: "#f59e0b", ZA: "#22c55e", NG: "#3b82f6", ID: "#1e40af",
  TR: "#b91c1c", UA: "#60a5fa", AE: "#fbbf24", SA: "#FFCE00",
  EG: "#1e40af", BD: "#dc2626", VN: "#dc2626", TH: "#16a34a",
  PH: "#16a34a", CO: "#ef4444", CL: "#991b1b", PE: "#1e40af",
  HK: "#b91c1c", MY: "#991b1b", CH: "#dc2626", BE: "#6b7280",
  AT: "#dc2626", DK: "#dc2626", FI: "#3b82f6", NO: "#dc2626",
  IE: "#16a34a",
  // New countries
  MA: "#f97316", KE: "#84cc16", CZ: "#06b6d4", IL: "#a78bfa", RO: "#fb923c",
};

const getCountryColor = (iso2: string): string => countryColors[iso2] ?? "#555566";

const getDotsToShow = (iso2: string): number => {
  const data = devCountryActivity[iso2];
  if (!data) return 2;
  const { intensity } = data;
  if (intensity >= 0.9) return 35;
  if (intensity >= 0.7) return 25;
  if (intensity >= 0.5) return 15;
  if (intensity >= 0.35) return 8;
  if (intensity >= 0.2) return 4;
  return 2;
};

const topCountryCodes = new Set(
  Object.entries(devCountryActivity)
    .sort((a, b) => b[1].intensity - a[1].intensity)
    .slice(0, 10)
    .map(([code]) => code)
);

// ─── Hub marker IDs → country codes ──────────────────────────────────────────

const hubToCountry: Record<string, string> = {
  SFO: "US", NYC: "US", LON: "GB", BER: "DE", BLR: "IN",
  BEI: "CN", TKY: "JP", SYD: "AU", TOR: "CA", SAO: "BR",
  SIN: "SG", DXB: "AE", PAR: "FR", SEO: "KR", AMS: "NL",
  WAR: "PL", KHI: "PK", LAG: "NG", CPT: "ZA",
  // New hubs
  ISB: "PK", LHR: "PK", NRB: "KE", PRG: "CZ", TLV: "IL", BUC: "RO", CAS: "MA",
};

// ─── Canvas for static dots ───────────────────────────────────────────────────

const StaticDotsCanvas = memo(({
  dots, width, height,
}: {
  dots: Array<{ x: number; y: number }>;
  width: number;
  height: number;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(100, 100, 130, 0.35)";
    for (const dot of dots) {
      ctx.fillRect(dot.x, dot.y, 3, 3);
    }
  }, [dots, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
});
StaticDotsCanvas.displayName = "StaticDotsCanvas";

// ─── Animated dots via CSS (no framer-motion per dot) ────────────────────────

const AnimatedDotsSVG = memo(({
  dots, width, height,
}: {
  dots: Array<{ key: string; x: number; y: number; color: string; canPulse: boolean; rank: number }>;
  width: number;
  height: number;
}) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
  >
    {dots.map(dot => (
      <rect
        key={dot.key}
        x={dot.x}
        y={dot.y}
        width={3}
        height={3}
        fill={dot.color}
        style={dot.canPulse ? {
          animation: `mapPulse 2s ease-in-out infinite`,
          animationDelay: `${(dot.rank * 0.12) % 2}s`,
          transformOrigin: `${dot.x + 1.5}px ${dot.y + 1.5}px`,
        } : undefined}
      />
    ))}
  </svg>
));
AnimatedDotsSVG.displayName = "AnimatedDotsSVG";

// ─── Hub markers rendered directly in SVG (no CDN fetch) ─────────────────────

const HubMarkersSVG = memo(({
  markers, projection, width, height, onHover,
}: {
  markers: typeof devHubMarkers;
  projection: ReturnType<typeof geoMercator>;
  width: number;
  height: number;
  onHover: (marker: typeof devHubMarkers[0] | null, x: number, y: number) => void;
}) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
  >
    <defs>
      <filter id="markerGlow">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>
    </defs>
    {markers.map((marker) => {
      const coords = projection(marker.coordinates);
      if (!coords) return null;
      const [cx, cy] = coords;
      if (cx < 0 || cx > width || cy < 0 || cy > height) return null;
      const countryCode = hubToCountry[marker.id];
      const accentColor = countryCode ? (countryColors[countryCode] ?? "#00ff88") : "#00ff88";
      return (
        <g
          key={marker.id}
          transform={`translate(${cx}, ${cy})`}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => onHover(marker, cx, cy)}
          onMouseLeave={() => onHover(null, 0, 0)}
        >
          {/* Outer pulse ring */}
          <circle r={10} fill="none" stroke={accentColor} strokeWidth={0.8} strokeOpacity={0.25}
            style={{ animation: "markerPulse 2s ease-out infinite" }} />
          {/* Inner glow ring */}
          <circle r={6} fill={`${accentColor}12`} stroke={accentColor} strokeWidth={0.6} strokeOpacity={0.5} />
          {/* Triangle marker */}
          <polygon
            points="0,-5 -4,3 4,3"
            fill="#f0f0fa"
            stroke={accentColor}
            strokeWidth={0.8}
            strokeOpacity={0.7}
            filter="url(#markerGlow)"
            style={{ paintOrder: "stroke" }}
          />
          {/* Hub ID label */}
          <text
            x={0} y={14}
            textAnchor="middle"
            fontSize={6}
            fontFamily="var(--font-geist-mono), monospace"
            fill={accentColor}
            fillOpacity={0.7}
            letterSpacing={0.5}
          >
            {marker.id}
          </text>
        </g>
      );
    })}
  </svg>
));
HubMarkersSVG.displayName = "HubMarkersSVG";

// ─── Live counter hook ────────────────────────────────────────────────────────

function useLiveCount(base: number, variancePerSec: number) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    if (!variancePerSec) return;
    const id = setInterval(() => {
      setVal(v => Math.max(0, v + Math.floor((Math.random() - 0.3) * variancePerSec)));
    }, 1200);
    return () => clearInterval(id);
  }, [variancePerSec]);
  return val;
}

// ─── Rich tooltip ─────────────────────────────────────────────────────────────

function HubTooltip({
  marker, countryData, pos, mapWidth, mapHeight,
}: {
  marker: typeof devHubMarkers[0];
  countryData: CountryActivity | null;
  pos: { x: number; y: number };
  mapWidth: number;
  mapHeight: number;
}) {
  const liveDevs    = useLiveCount(countryData?.devCount ?? 0, (countryData?.devCount ?? 0) * 0.00004);
  const livePushes  = useLiveCount(countryData?.githubPushes ?? 0, (countryData?.githubPushes ?? 0) * 0.0002);
  const liveRepos   = useLiveCount(countryData?.githubRepos ?? 0, 2);

  const pctLeft = (pos.x / mapWidth) * 100;
  const pctTop  = (pos.y / mapHeight) * 100;
  // Flip to left side if near right edge, flip up if near bottom
  const flipX   = pctLeft > 65;
  const flipY   = pctTop > 60;

  const accentColor = countryData?.color ?? "#00ff88";

  return (
    <motion.div
      key={marker.id}
      initial={{ opacity: 0, scale: 0.92, y: flipY ? 4 : -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.1 } }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="absolute pointer-events-none z-20 font-mono"
      style={{
        left: `${pctLeft}%`,
        top: `${pctTop}%`,
        transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, ${flipY ? "calc(-100% - 8px)" : "-50%"})`,
        minWidth: 230,
        maxWidth: 260,
        background: "rgba(6,6,14,0.98)",
        border: `1px solid ${accentColor}35`,
        borderRadius: 12,
        boxShadow: `0 0 0 1px ${accentColor}12, 0 0 24px ${accentColor}18, 0 20px 60px rgba(0,0,0,0.8)`,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{
        padding: "10px 12px 8px",
        borderBottom: `1px solid ${accentColor}20`,
        background: `linear-gradient(135deg, ${accentColor}10, transparent)`,
      }}>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {countryData?.flag && (
              <span style={{ fontSize: 18, lineHeight: 1 }}>{countryData.flag}</span>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span style={{ color: accentColor, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
                  {marker.id}
                </span>
                <span style={{ color: "#444460", fontSize: 10 }}>·</span>
                <span style={{ color: "#d0d0e8", fontSize: 11 }}>{marker.name}</span>
              </div>
              {countryData?.region && (
                <div style={{ color: "#555570", fontSize: 9, letterSpacing: "0.1em", marginTop: 2 }}>
                  {countryData.region.toUpperCase()}
                </div>
              )}
            </div>
          </div>
          {/* Live pulse */}
          <div className="flex items-center gap-1.5">
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              backgroundColor: accentColor,
              display: "inline-block",
              animation: "pulse-dot 1.5s ease-in-out infinite",
              boxShadow: `0 0 8px ${accentColor}`,
            }} />
            <span style={{ color: accentColor, fontSize: 8, letterSpacing: "0.14em", fontWeight: 700 }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      {countryData && (
        <div style={{ padding: "8px 12px 10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px" }}>

            <TooltipStat
              label="Developers"
              value={formatNumber(liveDevs)}
              color={accentColor}
              live
            />
            <TooltipStat
              label="GitHub Pushes/day"
              value={formatNumber(livePushes)}
              color="#00d4ff"
              live
            />
            {countryData.githubRepos && (
              <TooltipStat
                label="Public Repos"
                value={formatNumber(liveRepos)}
                color="#a78bfa"
                live
              />
            )}
            {countryData.freelancers && (
              <TooltipStat
                label="Freelancers"
                value={formatNumber(countryData.freelancers)}
                color="#f59e0b"
              />
            )}
            {countryData.topLanguage && (
              <TooltipStat
                label="Top Language"
                value={countryData.topLanguage}
                color="#00d4ff"
              />
            )}
            {countryData.topFramework && (
              <TooltipStat
                label="Top Framework"
                value={countryData.topFramework}
                color="#818cf8"
              />
            )}
            {countryData.aiAdoption && (
              <TooltipStat
                label="AI Adoption"
                value={`${countryData.aiAdoption}%`}
                color="#00ff88"
              />
            )}
            {countryData.remoteWorkers && (
              <TooltipStat
                label="Remote Workers"
                value={`${countryData.remoteWorkers}%`}
                color="#fb923c"
              />
            )}
          </div>

          {/* YoY growth bar */}
          {countryData.yoyGrowth && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${accentColor}15` }}>
              <div className="flex items-center justify-between" style={{ marginBottom: 4 }}>
                <span style={{ color: "#555570", fontSize: 9, letterSpacing: "0.08em" }}>YoY DEV GROWTH</span>
                <span style={{ color: "#00ff88", fontSize: 10, fontWeight: 700 }}>+{countryData.yoyGrowth}%</span>
              </div>
              <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(countryData.yoyGrowth * 2, 100)}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg, #00ff88, #00d4ff)`,
                    borderRadius: 2,
                    boxShadow: "0 0 6px rgba(0,255,136,0.4)",
                  }}
                />
              </div>
            </div>
          )}

          {/* Avg salary if available */}
          {countryData.avgSalary && (
            <div style={{
              marginTop: 8, paddingTop: 8,
              borderTop: `1px solid ${accentColor}15`,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <span style={{ color: "#555570", fontSize: 9, letterSpacing: "0.08em" }}>AVG SALARY</span>
              <span style={{ color: "#fbbf24", fontSize: 11, fontWeight: 700 }}>
                ${formatNumber(countryData.avgSalary)}/yr
              </span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

function TooltipStat({ label, value, color, live }: {
  label: string; value: string; color: string; live?: boolean;
}) {
  return (
    <div>
      <div style={{ color: "#444460", fontSize: 9, letterSpacing: "0.07em", marginBottom: 1 }}>
        {label.toUpperCase()}
        {live && <span style={{ color, marginLeft: 3, fontSize: 8 }}>●</span>}
      </div>
      <div style={{ color, fontSize: 11, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
        {value}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DottedMap({ width = 1000, height = 480 }: { width?: number; height?: number }) {
  const [hoveredMarker, setHoveredMarker] = useState<typeof devHubMarkers[0] | null>(null);
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });

  const projection = useMemo(
    () => geoMercator().scale(148).center([15, 20]).rotate([0, 0, 0]).translate([width / 2, height / 2]),
    [width, height]
  );

  const { staticDots, animatedDots } = useMemo(() => {
    const staticArr: Array<{ x: number; y: number }> = [];
    const animatedArr: Array<{ key: string; x: number; y: number; color: string; canPulse: boolean; rank: number }> = [];

    for (const [countryCode, cities] of Object.entries(
      dottedMapData as Record<string, Array<{ lon: number; lat: number; cityDistanceRank: number }>>
    )) {
      const dotsToShow = getDotsToShow(countryCode);
      const color = getCountryColor(countryCode);
      const isTop10 = topCountryCodes.has(countryCode);

      for (const city of cities) {
        const coords = projection([city.lon, city.lat]);
        if (!coords) continue;
        const [x, y] = coords;
        if (x < 0 || x > width || y < 0 || y > height) continue;

        if (city.cityDistanceRank < dotsToShow) {
          animatedArr.push({
            key: `${countryCode}-${city.cityDistanceRank}`,
            x, y, color,
            canPulse: isTop10 && city.cityDistanceRank < 5,
            rank: city.cityDistanceRank,
          });
        } else {
          staticArr.push({ x, y });
        }
      }
    }

    return { staticDots: staticArr, animatedDots: animatedArr };
  }, [projection, width, height]);

  const handleHover = useCallback((marker: typeof devHubMarkers[0] | null, x: number, y: number) => {
    setHoveredMarker(marker);
    setHoverPos({ x, y });
  }, []);

  const countryCode = hoveredMarker ? hubToCountry[hoveredMarker.id] : null;
  const countryData = countryCode ? devCountryActivity[countryCode] : null;

  return (
    <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
      {/* Layer 1: static dots on canvas (fast, zero DOM nodes) */}
      <StaticDotsCanvas dots={staticDots} width={width} height={height} />

      {/* Layer 2: animated/colored dots in SVG with CSS animations */}
      <AnimatedDotsSVG dots={animatedDots} width={width} height={height} />

      {/* Layer 3: hub markers directly in SVG  no CDN fetch */}
      <HubMarkersSVG
        markers={devHubMarkers}
        projection={projection}
        width={width}
        height={height}
        onHover={handleHover}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {hoveredMarker && (
          <HubTooltip
            marker={hoveredMarker}
            countryData={countryData}
            pos={hoverPos}
            mapWidth={width}
            mapHeight={height}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
