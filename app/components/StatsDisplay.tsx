"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  salaryByRole,
  aiRiskByRole,
  hotNiches,
  liveCounterConfig,
  formatNumber,
  devCountryActivity,
} from "../data/dev-data";
import AIRiskCard from "./AIRiskCard";

// ─── Animated counter ────────────────────────────────────────────────────────

function useAnimatedNumber(baseValue: number, incrementRatePerSecond: number) {
  const [value, setValue] = useState(baseValue);
  const displayRateRef = useRef(incrementRatePerSecond);
  const [displayRate, setDisplayRate] = useState(incrementRatePerSecond);
  const maxValueRef = useRef(baseValue * 1.5);

  useEffect(() => {
    if (incrementRatePerSecond === 0) return;
    maxValueRef.current = Math.max(maxValueRef.current, baseValue * 1.5);
    const updatesPerSecond = 10;
    const baseIncrement = incrementRatePerSecond / updatesPerSecond;
    let tickCount = 0;
    const interval = setInterval(() => {
      const variation = 0.7 + Math.random() * 0.6;
      const increment = Math.max(1, Math.floor(baseIncrement * variation));
      setValue(v => {
        const next = v + increment;
        return next > maxValueRef.current ? baseValue : next;
      });
      tickCount++;
      if (tickCount % 3 === 0) {
        const rate = Math.floor(incrementRatePerSecond * (0.85 + Math.random() * 0.3));
        displayRateRef.current = rate;
        setDisplayRate(rate);
      }
    }, 1000 / updatesPerSecond);
    return () => clearInterval(interval);
  }, [incrementRatePerSecond, baseValue]);

  return { value, rate: displayRate };
}

// ─── Pixel flip transition ────────────────────────────────────────────────────

function PixelGridTransition({
  firstContent, secondContent, isActive,
  gridSize = 30, animationStepDuration = 0.3, className,
}: {
  firstContent: React.ReactNode;
  secondContent: React.ReactNode;
  isActive: boolean;
  gridSize?: number;
  animationStepDuration?: number;
  className?: string;
}) {
  const [showPixels, setShowPixels] = useState(false);
  const [animState, setAnimState] = useState<"idle" | "growing" | "shrinking">("idle");
  const hasActivatedRef = useRef(false);

  const pixels = useMemo(() => {
    const total = gridSize * gridSize;
    const result = [];
    for (let n = 0; n < total; n++) {
      const row = Math.floor(n / gridSize);
      const col = n % gridSize;
      // eslint-disable-next-line react-hooks/purity
      const color = Math.random() > 0.85 ? "var(--accent-primary)" : "var(--ds-gray-200)";
      result.push({ id: n, row, col, color });
    }
    return result;
  }, [gridSize]);

  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);

  useEffect(() => {
    if (!hasActivatedRef.current && !isActive) return;
    if (isActive) hasActivatedRef.current = true;
    const indices = pixels.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledOrder(indices);
    setShowPixels(true);
    setAnimState("growing");
    const t1 = setTimeout(() => setAnimState("shrinking"), animationStepDuration * 1000);
    const t2 = setTimeout(() => { setShowPixels(false); setAnimState("idle"); }, animationStepDuration * 2000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      setShowPixels(false);
      setAnimState("idle");
    };
  }, [isActive, animationStepDuration, pixels]);

  const delayPerPixel = useMemo(() => animationStepDuration / pixels.length, [animationStepDuration, pixels.length]);
  const orderMap = useMemo(() => {
    const map = new Map<number, number>();
    shuffledOrder.forEach((idx, order) => map.set(idx, order));
    return map;
  }, [shuffledOrder]);

  return (
    <div className={`w-full overflow-hidden max-w-full relative ${className || ""}`}>
      <motion.div aria-hidden={isActive}
        initial={{ opacity: 1 }} animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0, delay: animationStepDuration }}>
        {firstContent}
      </motion.div>
      <motion.div
        className="absolute inset-0 w-full z-2 overflow-auto"
        initial={{ opacity: 0 }} animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0, delay: animationStepDuration }}
        style={{ pointerEvents: isActive ? "auto" : "none" }}
        aria-hidden={!isActive}>
        {secondContent}
      </motion.div>
      <div className="absolute inset-0 w-full h-full pointer-events-none z-3"
        style={{ display: "grid", gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        <AnimatePresence>
          {showPixels && pixels.map(pixel => {
            const order = orderMap.get(pixel.id) ?? 0;
            return (
              <motion.div key={pixel.id}
                style={{ backgroundColor: pixel.color, aspectRatio: "1 / 1", gridArea: `${pixel.row + 1} / ${pixel.col + 1}` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: animState === "growing" ? 1 : 0, scale: animState === "growing" ? 1 : 0 }}
                transition={{ duration: 0.01, delay: order * delayPerPixel }}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Info icon ────────────────────────────────────────────────────────────────

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill="currentColor" />
    </svg>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({
  title, children, infoContent, href, className, accent = "green",
}: {
  title: string;
  children?: React.ReactNode;
  infoContent?: string;
  href?: string;
  className?: string;
  accent?: "green" | "purple" | "cyan" | "none";
}) {
  const [showInfo, setShowInfo] = useState(false);

  const accentClass = {
    green: "card-glow-green",
    purple: "card-glow-purple",
    cyan: "card-glow-cyan",
    none: "card-glow",
  }[accent];

  const accentColor = {
    green: "var(--accent-primary)",
    purple: "#a78bfa",
    cyan: "var(--accent-cyan)",
    none: "var(--ds-gray-500)",
  }[accent];

  const front = (
    <div className="p-3 sm:p-4 md:p-5 w-full">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-1 h-3 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
          <h2 className="my-0 font-mono font-semibold text-[11px] tracking-widest uppercase pr-6"
            style={{ color: "var(--ds-gray-700)" }}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </div>
  );

  const back = (
    <div className="p-3 sm:p-4 md:p-5 w-full overflow-y-auto flex flex-col gap-y-2">
      {href ? (
        <a href={href} tabIndex={showInfo ? 0 : -1}
          className="my-0 font-mono font-semibold text-[11px] tracking-widest uppercase hover:underline underline-offset-2 inline-flex gap-x-0.5 items-center w-fit shrink-0"
          style={{ color: accentColor }}>
          {title}
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.75011 4H6.00011V5.5H6.75011H9.43945L5.46978 9.46967L4.93945 10L6.00011 11.0607L6.53044 10.5303L10.499 6.56182V9.25V10H11.999V9.25V5C11.999 4.44772 11.5512 4 10.999 4H6.75011Z" />
          </svg>
        </a>
      ) : (
        <span className="my-0 font-mono font-semibold text-[11px] tracking-widest uppercase shrink-0"
          style={{ color: accentColor }}>{title}</span>
      )}
      <span className="text-xs text-[var(--ds-gray-600)] leading-relaxed">{infoContent}</span>
    </div>
  );

  return (
    <div className={`relative group rounded-xl overflow-hidden card-base ${accentClass} ${className || ""}`}>
      <PixelGridTransition firstContent={front} secondContent={back} isActive={showInfo} gridSize={30} animationStepDuration={0.3} />
      {infoContent && (
        <div className={`absolute top-3 right-3 transition-opacity duration-150 z-20 isolate ${showInfo ? "opacity-100" : "opacity-100 md:opacity-0 md:group-hover:opacity-100"}`}>
          <button aria-label={`Learn more about ${title}`} type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="p-1 rounded bg-transparent border border-[var(--border-color)] text-[var(--ds-gray-500)] hover:text-[var(--ds-gray-1000)] hover:border-[var(--ds-gray-400)] transition-colors cursor-pointer flex items-center justify-center">
            <InfoIcon />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── TotalRequests  map overlay ─────────────────────────────────────────────

export function TotalRequests() {
  const { value, rate } = useAnimatedNumber(liveCounterConfig.devsOnline.base, liveCounterConfig.devsOnline.variance / 60);

  return (
    <div className="space-y-1 bg-[var(--ds-background-100)]/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-[var(--border-color)]">
      <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--ds-gray-500)]">Devs Online Now</div>
      <div className="text-2xl sm:text-3xl md:text-4xl tracking-tight font-mono tabular-nums text-glow-green">
        {formatNumber(value)}
      </div>
      <div className="text-[11px] text-[var(--accent-primary)]/70 font-mono tabular-nums">
        +{formatNumber(rate)}/s joining
      </div>
    </div>
  );
}

// ─── TopCountries  salary overlay ───────────────────────────────────────────

const roleColors = [
  "#00ff88", "#00d4ff", "#a78bfa", "#f59e0b",
  "#3b82f6", "#ff9500", "#ff2d55", "#16a34a",
];

export function TopCountries() {
  const incrementRates = [22, 19, 17, 14, 11, 8, 6, 5];

  return (
    <div className="bg-[var(--ds-background-100)]/70 backdrop-blur-md rounded-xl p-2.5 sm:p-3 border border-[var(--border-color)] space-y-1.5 sm:space-y-2">
      <div className="text-[10px] font-mono tracking-widest uppercase text-[var(--ds-gray-500)]">Salary by Role</div>
      <ul className="list-none pl-0 space-y-1">
        {salaryByRole.map((item, index) => {
          const color = roleColors[index] ?? "#666";
          return (
            <SalaryRow key={item.role} item={item} color={color} incrementRate={incrementRates[index] ?? 5} />
          );
        })}
      </ul>
    </div>
  );
}

function SalaryRow({ item, color, incrementRate }: { item: typeof salaryByRole[0]; color: string; incrementRate: number }) {
  const { value } = useAnimatedNumber(item.median, incrementRate);

  return (
    <li className="flex items-center gap-2 text-[11px] font-mono">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="flex-1 truncate" style={{ color }}>{item.role}</span>
      <span className="tabular-nums text-[var(--ds-gray-1000)]">${formatNumber(value)}</span>
      <span className="w-10 text-right" style={{ color: item.yoy > 0 ? "#00ff88" : "#ff2d55" }}>
        {item.yoy > 0 ? "▲" : "▼"}{Math.abs(item.yoy)}%
      </span>
    </li>
  );
}

export function RegionCount() {
  const count = Object.keys(devCountryActivity).length;
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--ds-gray-500)]">
      <span className="text-[var(--accent-primary)]">▲</span>
      <span className="text-[var(--ds-gray-1000)] font-semibold">{count}</span>
      <span>countries active</span>
    </div>
  );
}

// ─── StatsGrid ────────────────────────────────────────────────────────────────

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-start">

      {/* Left column: GitHub + AI Adoption stacked */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <StatCard
          title="GitHub Activity"
          accent="green"
          infoContent="Live GitHub commit rate across all public repositories worldwide. Variance reflects real-time push bursts across millions of developers."
        >
          <GitHubStats />
        </StatCard>

        <StatCard
          title="AI Tool Adoption"
          accent="cyan"
          infoContent="Percentage of developers actively using AI coding assistants (Copilot, Cursor, Claude, etc.) based on survey data and usage telemetry."
        >
          <AIAdoptionStats />
        </StatCard>
      </div>

      {/* Middle column: AI Replacement Risk (2-col grid of cards) */}
      <StatCard
        title="AI Replacement Risk"
        accent="purple"
        infoContent="Estimated probability AI will automate the majority of tasks in each role within 3 years. Click any card to flip for upskilling advice."
      >
        <div className="grid grid-cols-2 gap-2 mt-1">
          {aiRiskByRole.map((item, i) => (
            <AIRiskCard key={item.role} role={item.role} risk={item.risk} status={item.status} index={i} />
          ))}
        </div>
      </StatCard>

      {/* Right column: Hot Niches */}
      <StatCard
        title="Hot Niches · Demand Index"
        accent="cyan"
        infoContent="Demand index (0–100) based on job postings, freelance rates, and search trends. Growth is YoY. Avg rate is freelance/contract market rate."
        className="sm:col-span-2 lg:col-span-1"
      >
        <HotNichesList />
      </StatCard>

    </div>
  );
}

// ─── GitHub Stats ─────────────────────────────────────────────────────────────

function GitHubStats() {
  const commits = useAnimatedNumber(liveCounterConfig.githubCommitsPerSec.base, liveCounterConfig.githubCommitsPerSec.variance / 10);
  const jobs    = useAnimatedNumber(liveCounterConfig.newJobPostingsPerMin.base, liveCounterConfig.newJobPostingsPerMin.variance / 60);

  return (
    <div className="space-y-3">
      <StatRow label="Commits / sec" value={formatNumber(commits.value)} sub={`${formatNumber(commits.rate)}/s`} color="var(--accent-primary)" />
      <StatRow label="New Jobs / min" value={formatNumber(jobs.value)} color="var(--accent-cyan)" />
      <StatRow label="Open Source Repos" value={formatNumber(liveCounterConfig.openSourceRepos.base)} color="var(--ds-gray-600)" />
    </div>
  );
}

function StatRow({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-[var(--border-color)] last:border-0">
      <span className="text-[11px] font-mono uppercase tracking-wide text-[var(--ds-gray-500)]">{label}</span>
      <div className="flex items-center gap-2 text-right">
        <span className="text-sm font-mono tabular-nums font-semibold" style={{ color }}>{value}</span>
        {sub && <span className="text-[10px] font-mono text-[var(--ds-gray-500)]">{sub}</span>}
      </div>
    </div>
  );
}

// ─── AI Adoption Stats ────────────────────────────────────────────────────────

function AIAdoptionStats() {
  const soQs = useAnimatedNumber(liveCounterConfig.stackOverflowQsPerHr.base, liveCounterConfig.stackOverflowQsPerHr.variance / 3600);

  const adoptionPct = liveCounterConfig.aiToolsAdoption.base;

  return (
    <div className="space-y-3">
      {/* Adoption bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-mono uppercase tracking-wide text-[var(--ds-gray-500)]">Devs using AI</span>
          <span className="text-sm font-mono font-semibold text-glow-cyan">{adoptionPct}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden bg-[var(--ds-gray-alpha-200)]">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, var(--accent-cyan), var(--accent-primary))" }}
            initial={{ width: 0 }}
            animate={{ width: `${adoptionPct}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      </div>
      <StatRow label="SO Questions / hr" value={formatNumber(soQs.value)} color="var(--accent-cyan)" />
      <StatRow label="AI Tools Available" value="340+" color="var(--ds-gray-600)" />
      <StatRow label="AI Code Completions / day" value="1.2B+" color="var(--accent-primary)" />
    </div>
  );
}

// ─── Hot Niches ───────────────────────────────────────────────────────────────

const nicheColors = [
  "var(--accent-primary)",
  "var(--accent-cyan)",
  "#a78bfa",
  "#f59e0b",
  "#3b82f6",
  "#ff9500",
  "#ff2d55",
];

function HotNichesList() {
  const sortedNiches = useMemo(
    () => hotNiches.slice().sort((a, b) => b.demand - a.demand),
    []
  );

  return (
    <div className="space-y-3 mt-1">
      {sortedNiches.map((niche, i) => {
          const color = nicheColors[i] ?? "var(--ds-gray-500)";
          return (
            <motion.div key={niche.name}
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono truncate flex-1" style={{ color }}>{niche.name}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[var(--border-color)] text-[var(--ds-gray-500)]"
                    style={{ borderColor: `${color}40` }}>
                    {niche.growth}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--ds-gray-600)]">{niche.avgRate}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-[var(--ds-gray-alpha-200)]">
                  <motion.div className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                    initial={{ width: 0 }} animate={{ width: `${niche.demand}%` }}
                    transition={{ delay: 0.4 + i * 0.07, duration: 0.9, ease: "easeOut" }} />
                </div>
                <span className="text-[10px] font-mono text-[var(--ds-gray-500)] w-6 text-right">{niche.demand}</span>
              </div>
            </motion.div>
          );
        })}
    </div>
  );
}
