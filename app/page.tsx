import MapContainer from "./components/MapContainer";
import JobTicker from "./components/JobTicker";
import LiveClock from "./components/LiveClock";
import ConnectivityIndicator from "./components/ConnectivityIndicator";
import Image from "next/image";
import {
  TotalRequests,
  TopCountries,
  RegionCount,
  StatsGrid,
} from "./components/StatsDisplay";
import LiveFeed from "./components/LiveFeed";
import { devCountryActivity, devHubMarkers } from "./data/dev-data";

function MobileMapOverlays() {
  return (
    <>
      <TotalRequests />
      <TopCountries />
      <RegionCount />
    </>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen font-mono">
      <ConnectivityIndicator />

      {/* ── Top nav ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--ds-background-100)]/90 backdrop-blur-md">
        {/* Main nav row */}
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 h-11 sm:h-12 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Image src="/logo.svg" alt="DevPulse" width={16} height={16} className="shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[var(--ds-gray-1000)] truncate">DevPulse</span>
            <span className="hidden sm:block text-[9px] tracking-widest uppercase text-[var(--ds-gray-500)] border border-[var(--border-color)] px-2 py-0.5 rounded-full shrink-0">
              Global Dev Intelligence
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] pulse-dot" />
              <span className="text-[10px] uppercase tracking-widest text-[var(--accent-primary)] font-semibold">Live</span>
            </div>
            <span className="hidden lg:block text-[10px] text-[var(--ds-gray-500)] font-mono tabular-nums">
              <LiveClock />
            </span>
          </div>
        </div>
        {/* Job ticker row */}
        <JobTicker />
      </header>

      <main className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 space-y-3 sm:space-y-4 md:space-y-5">

        {/* ── Map section ── */}
        <section className="relative rounded-xl sm:rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)', background: 'var(--ds-background-200)' }}>

          {/* Map  hidden on mobile, shown sm+ */}
          <div className="hidden sm:block w-full">
            <MapContainer />
          </div>

          {/* Mobile: stacked map info cards instead of map */}
          <div className="sm:hidden p-3 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] pulse-dot" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent-primary)]">Developer Activity</span>
              <span className="ml-auto text-[9px] font-mono text-[var(--ds-gray-500)]">
                {Object.keys(devCountryActivity).length} countries · {devHubMarkers.length} hubs
              </span>
            </div>
            <MobileMapOverlays />
          </div>

          {/* Desktop overlays  only on sm+ */}
          {/* Top-left: devs online */}
          <div className="hidden sm:block absolute top-3 left-3 md:top-5 md:left-5 z-10">
            <TotalRequests />
          </div>

          {/* Bottom-left: salary + countries */}
          <div className="hidden sm:block absolute bottom-3 left-3 md:bottom-5 md:left-5 z-10 space-y-2">
            <TopCountries />
            <RegionCount />
          </div>

          {/* Top-right: label */}
          <div className="hidden sm:block absolute top-3 right-3 md:top-5 md:right-5 z-10 text-right">
            <div className="text-[9px] font-mono tracking-widest uppercase text-[var(--ds-gray-500)]">Developer Activity Map</div>
            <div className="text-[9px] text-[var(--ds-gray-500)] mt-0.5">Hover cities for details</div>
          </div>

          {/* Bottom-right: data sources */}
          <div className="hidden md:block absolute bottom-3 right-3 md:bottom-5 md:right-5 z-10 text-right">
            <div className="text-[9px] font-mono text-[var(--ds-gray-500)]">
              {Object.keys(devCountryActivity).length} countries · {devHubMarkers.length} dev hubs
            </div>
          </div>
        </section>

        {/* ── Stats grid ── */}
        <StatsGrid />

        {/* ── Live feed ── */}
        <LiveFeed />

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border-color)] py-3 sm:py-4 px-3 sm:px-6 mt-1 sm:mt-2">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-2 text-[10px] text-[var(--ds-gray-500)] font-mono">
          <span>DevPulse · Real-time developer ecosystem intelligence</span>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="hidden sm:block">Data: GitHub · Remotive · HackerNews · Dev.to · Stack Overflow</span>
            <span className="text-[var(--ds-gray-300)]">·</span>
            <span>
              Made by{" "}
              <a href="https://themvpguy.vercel.app" target="_blank" rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline underline-offset-2">
                Muhammad Tanveer Abbas
              </a>
            </span>
            <a href="https://x.com/m_tanveerabbas" target="_blank" rel="noopener noreferrer"
              className="hover:text-[var(--ds-gray-1000)] transition-colors">
              X: @m_tanveerabbas
            </a>
            <a href="https://github.com/MuhammadTanveerAbbas" target="_blank" rel="noopener noreferrer"
              className="hover:text-[var(--ds-gray-1000)] transition-colors">
              GitHub: MuhammadTanveerAbbas
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
