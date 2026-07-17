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

const topCountriesForMobile = Object.entries(devCountryActivity)
  .sort((a, b) => b[1].intensity - a[1].intensity)
  .slice(0, 5);

export default function Home() {
  return (
    <div className="min-h-screen font-mono">
      <ConnectivityIndicator />

      {/* ── Top nav ── */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[rgba(5,5,8,0.95)]">
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
        <section className="map-section relative rounded-xl sm:rounded-2xl overflow-hidden"
          style={{ border: '1px solid var(--border-color)', background: 'var(--ds-background-200)' }}>

          {/* Map: hidden on mobile, shown sm+ */}
          <div className="hidden sm:block w-full">
            <MapContainer />
          </div>

          {/* Mobile: top country cards instead of blank map */}
          <div className="sm:hidden p-3 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-color)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)] pulse-dot" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--accent-primary)]">Developer Activity</span>
              <span className="ml-auto text-[9px] font-mono text-[var(--ds-gray-500)]">
                {Object.keys(devCountryActivity).length} countries
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {topCountriesForMobile.map(([code, data]) => (
                <div key={code} className="rounded-lg p-2.5 border border-[var(--border-color)] bg-[var(--ds-background-300)]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-base leading-none">{data.flag}</span>
                    <span className="text-[10px] font-mono font-semibold text-[var(--ds-gray-1000)]">{code}</span>
                    <span className="ml-auto text-[9px] font-mono" style={{ color: data.color }}>
                      {Math.round(data.intensity * 100)}%
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-[var(--ds-gray-500)] mb-1">
                    {(data.devCount / 1_000_000).toFixed(1)}M devs
                  </div>
                  <div className="h-1 rounded-full overflow-hidden bg-[var(--ds-gray-alpha-200)]">
                    <div className="h-full rounded-full" style={{ width: `${data.intensity * 100}%`, backgroundColor: data.color }} />
                  </div>
                  <div className="text-[8px] font-mono text-[var(--ds-gray-500)] mt-1">
                    {data.topLanguage}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <span className="text-[9px] font-mono text-[var(--ds-gray-500)]">
                {devHubMarkers.length} dev hubs worldwide
              </span>
            </div>
          </div>

          {/* Desktop overlays: only on sm+ */}
          {/* Top-left: devs online */}
          <div className="hidden sm:block absolute top-3 left-3 md:top-5 md:left-5 z-10">
            <TotalRequests />
          </div>

          {/* Bottom-left: salary + countries (hidden on tablet to prevent overlap) */}
          <div className="hidden lg:block absolute bottom-3 left-3 md:bottom-5 md:left-5 z-10 space-y-2">
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
        <div className="livefeed-section">
          <LiveFeed />
        </div>

      </main>

      {/* ── Footer ── */}
      <div className="footer-gradient mx-3 sm:mx-6 md:mx-8" />
      <footer className="footer-section border-t border-[var(--border-color)] bg-[rgba(8,8,14,0.98)]">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6">
          {/* Main footer content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-4 sm:mb-5">
            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <Image src="/logo.svg" alt="DevPulse" width={14} height={14} />
                <span className="text-[11px] font-bold tracking-widest uppercase text-[var(--ds-gray-1000)]">DevPulse</span>
                <span className="text-[8px] tracking-wider uppercase text-[var(--accent-primary)] border border-[var(--accent-primary)] px-1.5 py-0.5 rounded-full opacity-60">LIVE</span>
              </div>
              <p className="text-[9px] text-[var(--ds-gray-500)] leading-relaxed max-w-[200px]">
                Real-time developer ecosystem intelligence across 40+ countries and 28 global hubs.
              </p>
            </div>

            {/* Data sources */}
            <div>
              <div className="text-[9px] font-semibold tracking-widest uppercase text-[var(--ds-gray-400)] mb-2">Data Sources</div>
              <div className="space-y-1.5">
                {['GitHub', 'Remotive', 'HackerNews', 'Dev.to', 'Stack Overflow'].map((source) => (
                  <div key={source} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent-primary)] opacity-40" />
                    <span className="text-[9px] text-[var(--ds-gray-500)]">{source}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regions tracked */}
            <div>
              <div className="text-[9px] font-semibold tracking-widest uppercase text-[var(--ds-gray-400)] mb-2">Regions</div>
              <div className="flex flex-wrap gap-1.5">
                {['Americas', 'Europe', 'Asia Pacific', 'Middle East', 'Africa'].map((region) => (
                  <span key={region} className="text-[8px] text-[var(--ds-gray-500)] border border-[var(--border-color)] px-1.5 py-0.5 rounded">
                    {region}
                  </span>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <div className="text-[9px] font-semibold tracking-widest uppercase text-[var(--ds-gray-400)] mb-2">Connect</div>
              <div className="space-y-1.5">
                <a href="https://x.com/m_tanveerabbas" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[9px] text-[var(--ds-gray-500)] hover:text-[var(--accent-primary)] transition-colors group">
                  <span className="w-1 h-1 rounded-full bg-[var(--ds-gray-400)] group-hover:bg-[var(--accent-primary)] transition-colors" />
                  X: @m_tanveerabbas
                </a>
                <a href="https://github.com/MuhammadTanveerAbbas" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[9px] text-[var(--ds-gray-500)] hover:text-[var(--accent-primary)] transition-colors group">
                  <span className="w-1 h-1 rounded-full bg-[var(--ds-gray-400)] group-hover:bg-[var(--accent-primary)] transition-colors" />
                  GitHub: MuhammadTanveerAbbas
                </a>
                <a href="https://themvpguy.vercel.app" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[9px] text-[var(--ds-gray-500)] hover:text-[var(--accent-primary)] transition-colors group">
                  <span className="w-1 h-1 rounded-full bg-[var(--ds-gray-400)] group-hover:bg-[var(--accent-primary)] transition-colors" />
                  Portfolio
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-3 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[8px] text-[var(--ds-gray-500)] tracking-wider">
              &copy; {new Date().getFullYear()} DevPulse · Built by{" "}
              <a href="https://themvpguy.vercel.app" target="_blank" rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline underline-offset-2">
                Muhammad Tanveer Abbas
              </a>
            </span>
            <span className="text-[8px] text-[var(--ds-gray-400)] font-mono">
              {Object.keys(devCountryActivity).length} countries · {devHubMarkers.length} dev hubs
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
