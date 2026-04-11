// app/lib/api.ts

const REMOTIVE_URL = 'https://remotive.com/api/remote-jobs?category=software-dev&limit=20';
const REMOTEOK_URL = 'https://remoteok.com/api?tag=dev';
const HN_TOP_URL   = 'https://hacker-news.firebaseio.com/v0/topstories.json';
const DEVTO_URL    = 'https://dev.to/api/articles?tag=javascript&per_page=7&top=1';
const GITHUB_TRENDING_URL = 'https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=7&created:>2024-01-01';

export async function fetchRemotiveJobs() {
  try {
    const res = await fetch(REMOTIVE_URL, { next: { revalidate: 300 } });
    const data = await res.json();
    return data.jobs?.slice(0, 20) ?? [];
  } catch { return []; }
}

export async function fetchRemoteOKJobs() {
  try {
    const res = await fetch(REMOTEOK_URL, {
      headers: { 'User-Agent': 'DevPulse/1.0' },
      next: { revalidate: 300 },
    });
    const data = await res.json();
    return Array.isArray(data) ? data.slice(1, 21) : [];
  } catch { return []; }
}

export async function fetchHNTopStories() {
  try {
    const res = await fetch(HN_TOP_URL, { next: { revalidate: 120 } });
    const ids: number[] = await res.json();
    const top8 = ids.slice(0, 7);
    const stories = await Promise.all(
      top8.map(id =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then(r => r.json())
      )
    );
    return stories.filter(s => s && s.title);
  } catch { return []; }
}

export async function fetchGithubTrending() {
  try {
    const res = await fetch(GITHUB_TRENDING_URL, { next: { revalidate: 600 } });
    const data = await res.json();
    return data.items ?? [];
  } catch { return []; }
}

export async function fetchDevToArticles() {
  try {
    const res = await fetch(DEVTO_URL, { next: { revalidate: 300 } });
    return await res.json();
  } catch { return []; }
}
