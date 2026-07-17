'use client';
import { useEffect, useState } from 'react';
import { fetchRemotiveJobs } from '@/app/lib/api';

interface RemotiveJob {
  url: string;
  title: string;
  company_name: string;
  salary?: string;
  category?: { name: string };
  job_type?: string;
  candidate_required_location?: string;
}

const jobTypeColor: Record<string, string> = {
  'full_time':  'var(--accent-primary)',
  'contract':   'var(--accent-cyan)',
  'freelance':  '#f59e0b',
  'part_time':  '#a78bfa',
};

const jobTypeLabel: Record<string, string> = {
  'full_time':  'FT',
  'contract':   'Contract',
  'freelance':  'Freelance',
  'part_time':  'PT',
};

const POLL_INTERVAL = 5 * 60 * 1000;

interface JobTickerState {
  jobs: RemotiveJob[];
  loaded: boolean;
}

export default function JobTicker() {
  const [state, setState] = useState<JobTickerState>({ jobs: [], loaded: false });

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await fetchRemotiveJobs();
        if (active) {
          setState({ jobs: data, loaded: true });
        }
      } catch {
        if (active) {
          setState({ jobs: [], loaded: true });
        }
      }
    }

    load();
    const interval = setInterval(load, POLL_INTERVAL);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (state.loaded && state.jobs.length === 0) {
    return (
      <div className="w-full overflow-hidden border-b border-[var(--border-color)]"
        style={{ background: 'var(--ds-background-300)' }}>
        <div className="flex items-center justify-center py-1.5">
          <span className="text-[10px] font-mono text-[var(--ds-gray-500)]">Job feed unavailable, retrying...</span>
        </div>
      </div>
    );
  }

  if (!state.jobs.length) return null;

  const { jobs } = state;
  const items = [...jobs, ...jobs, ...jobs];

  return (
    <div
      className="w-full overflow-hidden border-b border-[var(--border-color)]"
      style={{ background: 'var(--ds-background-300)' }}
    >
      <div className="flex items-stretch">
        <div className="flex-1 overflow-hidden py-1.5">
          <div
            className="flex items-center gap-0 animate-ticker whitespace-nowrap hover:[animation-play-state:paused]"
            style={{ animationDuration: `${Math.max(jobs.length * 6, 40)}s` }}
          >
            {items.map((job, i) => {
              const typeKey = job.job_type ?? '';
              const typeColor = jobTypeColor[typeKey] ?? 'var(--ds-gray-500)';
              const typeLabel = jobTypeLabel[typeKey] ?? job.job_type ?? '';
              return (
                <a
                  key={`${job.url}-${i}`}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 shrink-0 group"
                >
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border whitespace-nowrap"
                    style={{ color: 'var(--ds-gray-500)', borderColor: 'var(--border-color)', background: 'var(--ds-background-200)' }}>
                    {job.category?.name ?? 'Dev'}
                  </span>
                  <span className="text-[11px] font-mono text-[var(--ds-gray-700)] group-hover:text-[var(--ds-gray-1000)] transition-colors">
                    {job.title}
                  </span>
                  <span className="text-[10px] text-[var(--ds-gray-500)]">@</span>
                  <span className="text-[11px] font-semibold font-mono" style={{ color: 'var(--accent-primary)' }}>
                    {job.company_name}
                  </span>
                  {job.candidate_required_location && (
                    <span className="hidden md:inline text-[9px] font-mono text-[var(--ds-gray-500)]">
                      {job.candidate_required_location}
                    </span>
                  )}
                  {job.salary && (
                    <span className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.5 rounded border"
                      style={{ color: 'var(--accent-primary)', borderColor: 'rgba(0,255,136,0.2)', background: 'rgba(0,255,136,0.06)' }}>
                      {job.salary}
                    </span>
                  )}
                  {typeLabel && (
                    <span className="hidden sm:inline text-[9px] font-mono px-1.5 py-0.5 rounded border"
                      style={{ color: typeColor, borderColor: `${typeColor}30`, background: `${typeColor}0d` }}>
                      {typeLabel}
                    </span>
                  )}
                  <span className="text-[var(--ds-gray-300)] text-[10px] ml-1">·</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
