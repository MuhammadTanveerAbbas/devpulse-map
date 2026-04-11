import { fetchHNTopStories, fetchGithubTrending, fetchDevToArticles } from "@/app/lib/api";

interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  descendants?: number;
  time: number;
}

interface GHRepo {
  id: number;
  full_name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  topics?: string[];
}

interface DevToArticle {
  id: number;
  title: string;
  url: string;
  positive_reactions_count: number;
  comments_count: number;
  reading_time_minutes: number;
  tag_list: string[];
  user: { name: string };
  published_at: string;
}

function timeAgo(unixTs: number): string {
  const diff = Math.floor(Date.now() / 1000) - unixTs;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

const langColors: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f7df1e', Python: '#3572A5',
  Rust: '#dea584', Go: '#00ADD8', Java: '#b07219', 'C++': '#f34b7d',
  C: '#555555', Ruby: '#701516', Swift: '#F05138', Kotlin: '#A97BFF',
  Dart: '#00B4AB', Shell: '#89e051', HTML: '#e34c26', CSS: '#563d7c',
};

const ITEMS = 7;

export default async function LiveFeed() {
  const [hnStories, ghRepos, devArticles] = await Promise.all([
    fetchHNTopStories(),
    fetchGithubTrending(),
    fetchDevToArticles(),
  ]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 items-stretch">

      {/* HN Top Stories */}
      <div className="card-base card-glow-green p-3 sm:p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-primary)] text-sm">▲</span>
            <span className="section-label text-[var(--ds-gray-700)]">Hacker News</span>
          </div>
          <span className="text-[10px] text-[var(--ds-gray-500)] border border-[var(--border-color)] px-2 py-0.5 rounded">Top Stories</span>
        </div>
        <div className="flex flex-col flex-1 justify-between gap-0.5">
          {(hnStories as HNStory[]).slice(0, ITEMS).map((story, i) => (
            <a
              key={story.id}
              href={story.url ?? `https://news.ycombinator.com/item?id=${story.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group flex-1"
            >
              <div className="flex gap-2 items-start p-2 rounded-md transition-colors hover:bg-[var(--ds-gray-alpha-100)] border border-transparent hover:border-[var(--border-color)] h-full">
                <span className="text-[10px] text-[var(--ds-gray-500)] font-mono w-4 shrink-0 mt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[var(--ds-gray-1000)] leading-snug line-clamp-2 group-hover:text-[var(--accent-primary)] transition-colors">
                    {story.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[10px] text-[var(--accent-primary)] font-mono">▲ {story.score}</span>
                    <span className="text-[10px] text-[var(--ds-gray-500)]">by {story.by}</span>
                    {story.descendants !== undefined && (
                      <span className="text-[10px] text-[var(--ds-gray-500)]">{story.descendants} comments</span>
                    )}
                    <span className="text-[10px] text-[var(--ds-gray-500)] ml-auto">{timeAgo(story.time)}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
          {hnStories.length === 0 && (
            <p className="text-xs text-[var(--ds-gray-500)] text-center py-4">Loading stories...</p>
          )}
        </div>
      </div>

      {/* GitHub Trending */}
      <div className="card-base card-glow-purple p-3 sm:p-4 flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-[var(--accent-secondary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            <span className="section-label text-[var(--ds-gray-700)]">GitHub Trending</span>
          </div>
          <span className="text-[10px] text-[var(--ds-gray-500)] border border-[var(--border-color)] px-2 py-0.5 rounded">⭐ Stars</span>
        </div>
        <div className="flex flex-col flex-1 justify-between gap-0.5">
          {(ghRepos as GHRepo[]).slice(0, ITEMS).map((repo) => {
            const langColor = langColors[repo.language] ?? '#666';
            return (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group flex-1"
              >
                <div className="p-2 rounded-md transition-colors hover:bg-[var(--ds-gray-alpha-100)] border border-transparent hover:border-[var(--border-color)] h-full">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold text-[var(--ds-gray-1000)] group-hover:text-[#a78bfa] transition-colors truncate">
                      {repo.full_name}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--ds-gray-500)] shrink-0 flex items-center gap-1">
                      <span className="text-yellow-400">★</span> {formatStars(repo.stargazers_count)}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="text-[11px] text-[var(--ds-gray-600)] mt-1 line-clamp-1">{repo.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                    {repo.language && (
                      <span className="flex items-center gap-1 text-[10px] text-[var(--ds-gray-500)]">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: langColor }} />
                        {repo.language}
                      </span>
                    )}
                    {repo.topics?.slice(0, 2).map(t => (
                      <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--ds-gray-alpha-100)] text-[var(--ds-gray-500)] border border-[var(--border-color)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
          {ghRepos.length === 0 && (
            <p className="text-xs text-[var(--ds-gray-500)] text-center py-4">Loading repos...</p>
          )}
        </div>
      </div>

      {/* Dev.to Articles */}
      <div className="card-base card-glow-cyan p-3 sm:p-4 flex flex-col gap-3 h-full sm:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent-cyan)] text-sm font-bold">DEV</span>
            <span className="section-label text-[var(--ds-gray-700)]">Dev.to Articles</span>
          </div>
          <span className="text-[10px] text-[var(--ds-gray-500)] border border-[var(--border-color)] px-2 py-0.5 rounded">Trending</span>
        </div>
        <div className="flex flex-col flex-1 justify-between gap-0.5">
          {(devArticles as DevToArticle[]).slice(0, ITEMS).map((article) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group flex-1"
            >
              <div className="p-2 rounded-md transition-colors hover:bg-[var(--ds-gray-alpha-100)] border border-transparent hover:border-[var(--border-color)] h-full">
                <p className="text-xs text-[var(--ds-gray-1000)] leading-snug line-clamp-2 group-hover:text-[var(--accent-cyan)] transition-colors">
                  {article.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-[var(--ds-gray-500)]">by {article.user?.name}</span>
                  <span className="text-[10px] text-[var(--accent-primary)] font-mono">♥ {article.positive_reactions_count}</span>
                  <span className="text-[10px] text-[var(--ds-gray-500)]">{article.reading_time_minutes}m read</span>
                  {article.tag_list?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--ds-gray-alpha-100)] text-[var(--ds-gray-500)] border border-[var(--border-color)]">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
          {devArticles.length === 0 && (
            <p className="text-xs text-[var(--ds-gray-500)] text-center py-4">Loading articles...</p>
          )}
        </div>
      </div>

    </section>
  );
}
