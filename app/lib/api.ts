// app/lib/api.ts

const REMOTIVE_URL = 'https://remotive.com/api/remote-jobs?category=software-dev&limit=20';
const HN_TOP_URL   = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const DEVTO_URL    = 'https://dev.to/api/articles?tag=javascript&per_page=7&top=1';

interface RemotiveJob {
  url: string;
  title: string;
  company_name: string;
  salary?: string;
  category?: { name: string };
  job_type?: string;
  candidate_required_location?: string;
}

function getGitHubTrendingUrl(): string {
  const d = new Date(Date.now() - 90 * 86400000);
  const dateStr = d.toISOString().split('T')[0];
  return `https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=7&created:>${dateStr}`;
}

async function safeFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText} for ${url}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchRemotiveJobs(): Promise<RemotiveJob[]> {
  try {
    const data = await safeFetch<{ jobs?: RemotiveJob[] }>(REMOTIVE_URL, { next: { revalidate: 300 } });
    return data.jobs?.slice(0, 20) ?? [];
  } catch (e) {
    console.error('[DevPulse] fetchRemotiveJobs failed:', e);
    return [];
  }
}

export async function fetchHNTopStories() {
  try {
    const ids = await safeFetch<number[]>(HN_TOP_URL, { next: { revalidate: 120 } });
    const top7 = ids.slice(0, 7);
    const results = await Promise.allSettled(
      top7.map(id =>
        safeFetch<Record<string, unknown>>(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
    );
    return results
      .filter((r): r is PromiseFulfilledResult<Record<string, unknown>> => r.status === 'fulfilled')
      .map(r => r.value)
      .filter(s => s && s.title);
  } catch (e) {
    console.error('[DevPulse] fetchHNTopStories failed:', e);
    return [];
  }
}

export async function fetchGithubTrending() {
  try {
    const data = await safeFetch<{ items?: unknown[] }>(getGitHubTrendingUrl(), { next: { revalidate: 600 } });
    return data.items ?? [];
  } catch (e) {
    console.error('[DevPulse] fetchGithubTrending failed:', e);
    return [];
  }
}

export async function fetchDevToArticles() {
  try {
    return await safeFetch<unknown[]>(DEVTO_URL, { next: { revalidate: 300 } });
  } catch (e) {
    console.error('[DevPulse] fetchDevToArticles failed:', e);
    return [];
  }
}
