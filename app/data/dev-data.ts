// app/data/dev-data.ts

export interface CountryActivity {
  devCount: number;
  githubPushes: number;
  color: string;
  intensity: number;
  topLanguage?: string;
  flag?: string;
  region?: string;
  freelancers?: number;
  aiAdoption?: number;
  avgSalary?: number;
  topFramework?: string;
  githubRepos?: number;
  yoyGrowth?: number;
  remoteWorkers?: number;
}

export const devCountryActivity: Record<string, CountryActivity> = {
  US:  { devCount: 4_200_000, githubPushes: 2_840_000, color: '#00ff88', intensity: 1.0,  topLanguage: 'JavaScript',
         flag: '🇺🇸', region: 'North America', freelancers: 890_000, aiAdoption: 82, avgSalary: 138_000,
         topFramework: 'React', githubRepos: 8_400_000, yoyGrowth: 12, remoteWorkers: 58 },
  IN:  { devCount: 5_900_000, githubPushes: 1_920_000, color: '#f59e0b', intensity: 0.92, topLanguage: 'Python',
         flag: '🇮🇳', region: 'South Asia', freelancers: 1_200_000, aiAdoption: 74, avgSalary: 10_000,
         topFramework: 'Django', githubRepos: 3_100_000, yoyGrowth: 28, remoteWorkers: 62 },
  CN:  { devCount: 7_000_000, githubPushes: 1_540_000, color: '#ff2d55', intensity: 0.85, topLanguage: 'Java',
         flag: '🇨🇳', region: 'East Asia', freelancers: 420_000, aiAdoption: 69, avgSalary: 28_000,
         topFramework: 'Spring', githubRepos: 2_800_000, yoyGrowth: 18, remoteWorkers: 31 },
  DE:  { devCount: 920_000,   githubPushes: 680_000,   color: '#FFCE00', intensity: 0.72, topLanguage: 'Python',
         flag: '🇩🇪', region: 'Europe', freelancers: 180_000, aiAdoption: 71, avgSalary: 72_000,
         topFramework: 'Vue', githubRepos: 980_000, yoyGrowth: 9, remoteWorkers: 52 },
  GB:  { devCount: 530_000,   githubPushes: 590_000,   color: '#3b82f6', intensity: 0.68, topLanguage: 'JavaScript',
         flag: '🇬🇧', region: 'Europe', freelancers: 160_000, aiAdoption: 76, avgSalary: 78_000,
         topFramework: 'React', githubRepos: 860_000, yoyGrowth: 8, remoteWorkers: 55 },
  BR:  { devCount: 620_000,   githubPushes: 410_000,   color: '#22c55e', intensity: 0.60, topLanguage: 'JavaScript',
         flag: '🇧🇷', region: 'South America', freelancers: 140_000, aiAdoption: 65, avgSalary: 24_000,
         topFramework: 'React', githubRepos: 620_000, yoyGrowth: 22, remoteWorkers: 48 },
  CA:  { devCount: 400_000,   githubPushes: 390_000,   color: '#ef4444', intensity: 0.55, topLanguage: 'TypeScript',
         flag: '🇨🇦', region: 'North America', freelancers: 110_000, aiAdoption: 79, avgSalary: 98_000,
         topFramework: 'Next.js', githubRepos: 720_000, yoyGrowth: 11, remoteWorkers: 61 },
  FR:  { devCount: 480_000,   githubPushes: 320_000,   color: '#818cf8', intensity: 0.50, topLanguage: 'Python',
         flag: '🇫🇷', region: 'Europe', freelancers: 95_000, aiAdoption: 68, avgSalary: 62_000,
         topFramework: 'Vue', githubRepos: 540_000, yoyGrowth: 7, remoteWorkers: 49 },
  // ── Pakistan  prominent entry with full rich data ──
  PK:  { devCount: 580_000,   githubPushes: 390_000,   color: '#00d4ff', intensity: 0.54, topLanguage: 'JavaScript',
         flag: '🇵🇰', region: 'South Asia', freelancers: 120_000, aiAdoption: 42, avgSalary: 5_000,
         topFramework: 'React', githubRepos: 280_000, yoyGrowth: 34, remoteWorkers: 60 },
  AU:  { devCount: 370_000,   githubPushes: 250_000,   color: '#00e67a', intensity: 0.45, topLanguage: 'Python' },
  JP:  { devCount: 340_000,   githubPushes: 220_000,   color: '#00cc6a', intensity: 0.42, topLanguage: 'Java' },
  KR:  { devCount: 310_000,   githubPushes: 200_000,   color: '#00b35a', intensity: 0.40, topLanguage: 'JavaScript' },
  RU:  { devCount: 290_000,   githubPushes: 180_000,   color: '#009950', intensity: 0.38, topLanguage: 'Python' },
  NL:  { devCount: 180_000,   githubPushes: 130_000,   color: '#008040', intensity: 0.35, topLanguage: 'JavaScript' },
  SE:  { devCount: 160_000,   githubPushes: 120_000,   color: '#006630', intensity: 0.33, topLanguage: 'TypeScript' },
  SG:  { devCount: 140_000,   githubPushes: 100_000,   color: '#004d24', intensity: 0.30, topLanguage: 'Python' },
  PL:  { devCount: 220_000,   githubPushes: 150_000,   color: '#00ff88', intensity: 0.36, topLanguage: 'JavaScript' },
  ES:  { devCount: 200_000,   githubPushes: 140_000,   color: '#00e67a', intensity: 0.34, topLanguage: 'JavaScript' },
  IT:  { devCount: 190_000,   githubPushes: 130_000,   color: '#00cc6a', intensity: 0.32, topLanguage: 'Python' },
  MX:  { devCount: 170_000,   githubPushes: 110_000,   color: '#00b35a', intensity: 0.30, topLanguage: 'JavaScript' },
  AR:  { devCount: 150_000,   githubPushes: 95_000,    color: '#009950', intensity: 0.28, topLanguage: 'Python' },
  ZA:  { devCount: 90_000,    githubPushes: 55_000,    color: '#008040', intensity: 0.22, topLanguage: 'JavaScript' },
  NG:  { devCount: 80_000,    githubPushes: 45_000,    color: '#006630', intensity: 0.20, topLanguage: 'JavaScript' },
  ID:  { devCount: 130_000,   githubPushes: 80_000,    color: '#004d24', intensity: 0.26, topLanguage: 'JavaScript' },
  TR:  { devCount: 120_000,   githubPushes: 75_000,    color: '#00ff88', intensity: 0.25, topLanguage: 'Python' },
  UA:  { devCount: 110_000,   githubPushes: 70_000,    color: '#00e67a', intensity: 0.24, topLanguage: 'JavaScript' },
  AE:  { devCount: 70_000,    githubPushes: 42_000,    color: '#00cc6a', intensity: 0.20, topLanguage: 'Python' },
  SA:  { devCount: 65_000,    githubPushes: 38_000,    color: '#00b35a', intensity: 0.18, topLanguage: 'JavaScript' },
  EG:  { devCount: 60_000,    githubPushes: 35_000,    color: '#009950', intensity: 0.17, topLanguage: 'Python' },
  BD:  { devCount: 55_000,    githubPushes: 30_000,    color: '#008040', intensity: 0.16, topLanguage: 'JavaScript' },
  VN:  { devCount: 100_000,   githubPushes: 60_000,    color: '#006630', intensity: 0.23, topLanguage: 'JavaScript' },
  TH:  { devCount: 85_000,    githubPushes: 50_000,    color: '#004d24', intensity: 0.21, topLanguage: 'Python' },
  PH:  { devCount: 95_000,    githubPushes: 58_000,    color: '#00ff88', intensity: 0.22, topLanguage: 'JavaScript' },
  CO:  { devCount: 75_000,    githubPushes: 44_000,    color: '#00e67a', intensity: 0.20, topLanguage: 'JavaScript' },
  CL:  { devCount: 70_000,    githubPushes: 40_000,    color: '#00cc6a', intensity: 0.19, topLanguage: 'Python' },
  PE:  { devCount: 60_000,    githubPushes: 35_000,    color: '#00b35a', intensity: 0.17, topLanguage: 'JavaScript' },
  HK:  { devCount: 80_000,    githubPushes: 50_000,    color: '#009950', intensity: 0.21, topLanguage: 'Python' },
  MY:  { devCount: 90_000,    githubPushes: 55_000,    color: '#008040', intensity: 0.22, topLanguage: 'JavaScript' },
  CH:  { devCount: 120_000,   githubPushes: 80_000,    color: '#006630', intensity: 0.25, topLanguage: 'Python' },
  BE:  { devCount: 100_000,   githubPushes: 65_000,    color: '#004d24', intensity: 0.23, topLanguage: 'JavaScript' },
  AT:  { devCount: 85_000,    githubPushes: 55_000,    color: '#00ff88', intensity: 0.21, topLanguage: 'Python' },
  DK:  { devCount: 80_000,    githubPushes: 52_000,    color: '#00e67a', intensity: 0.20, topLanguage: 'TypeScript' },
  FI:  { devCount: 75_000,    githubPushes: 48_000,    color: '#00cc6a', intensity: 0.19, topLanguage: 'Python' },
  NO:  { devCount: 70_000,    githubPushes: 45_000,    color: '#00b35a', intensity: 0.18, topLanguage: 'TypeScript' },
  IE:  { devCount: 65_000,    githubPushes: 42_000,    color: '#009950', intensity: 0.17, topLanguage: 'JavaScript',
         flag: '🇮🇪', region: 'Europe', freelancers: 12_000, aiAdoption: 72, avgSalary: 68_000,
         topFramework: 'React', githubRepos: 58_000, yoyGrowth: 10, remoteWorkers: 54 },

  // ── 5 New Countries ──────────────────────────────────────────────────────────
  MA:  { devCount: 95_000,    githubPushes: 58_000,    color: '#f97316', intensity: 0.22, topLanguage: 'JavaScript',
         flag: '🇲🇦', region: 'North Africa', freelancers: 28_000, aiAdoption: 58, avgSalary: 14_000,
         topFramework: 'React', githubRepos: 72_000, yoyGrowth: 41, remoteWorkers: 72 },
  KE:  { devCount: 72_000,    githubPushes: 44_000,    color: '#84cc16', intensity: 0.20, topLanguage: 'JavaScript',
         flag: '🇰🇪', region: 'East Africa', freelancers: 22_000, aiAdoption: 54, avgSalary: 9_000,
         topFramework: 'Node.js', githubRepos: 48_000, yoyGrowth: 52, remoteWorkers: 78 },
  CZ:  { devCount: 145_000,   githubPushes: 98_000,    color: '#06b6d4', intensity: 0.29, topLanguage: 'TypeScript',
         flag: '🇨🇿', region: 'Europe', freelancers: 38_000, aiAdoption: 73, avgSalary: 42_000,
         topFramework: 'React', githubRepos: 148_000, yoyGrowth: 16, remoteWorkers: 58 },
  IL:  { devCount: 165_000,   githubPushes: 118_000,   color: '#a78bfa', intensity: 0.31, topLanguage: 'Python',
         flag: '🇮🇱', region: 'Middle East', freelancers: 42_000, aiAdoption: 84, avgSalary: 88_000,
         topFramework: 'React', githubRepos: 198_000, yoyGrowth: 19, remoteWorkers: 62 },
  RO:  { devCount: 130_000,   githubPushes: 88_000,    color: '#fb923c', intensity: 0.27, topLanguage: 'JavaScript',
         flag: '🇷🇴', region: 'Europe', freelancers: 35_000, aiAdoption: 67, avgSalary: 32_000,
         topFramework: 'Angular', githubRepos: 118_000, yoyGrowth: 21, remoteWorkers: 64 },
};

export const salaryByRole = [
  { role: 'AI/ML Engineer',        median: 185_000, yoy: +22, currency: 'USD' },
  { role: 'Security Engineer',     median: 162_000, yoy: +19, currency: 'USD' },
  { role: 'DevOps / Platform Eng', median: 155_000, yoy: +14, currency: 'USD' },
  { role: 'Data Engineer',         median: 148_000, yoy: +17, currency: 'USD' },
  { role: 'Backend Engineer',      median: 142_000, yoy: +11, currency: 'USD' },
  { role: 'Full Stack Dev',        median: 138_000, yoy: +8,  currency: 'USD' },
  { role: 'Mobile Developer',      median: 125_000, yoy: +6,  currency: 'USD' },
  { role: 'Frontend Developer',    median: 118_000, yoy: +5,  currency: 'USD' },
];

export const aiRiskByRole = [
  { role: 'Data Entry / CRUD Dev', risk: 87, status: 'critical' },
  { role: 'QA / Manual Tester',    risk: 76, status: 'high'     },
  { role: 'Junior Frontend Dev',   risk: 61, status: 'high'     },
  { role: 'Backend API Dev',       risk: 48, status: 'medium'   },
  { role: 'Full Stack Dev',        risk: 41, status: 'medium'   },
  { role: 'DevOps Engineer',       risk: 32, status: 'low'      },
  { role: 'AI/ML Engineer',        risk: 18, status: 'safe'     },
  { role: 'Security Engineer',     risk: 14, status: 'safe'     },
];

export const hotNiches = [
  { name: 'AI / LLM Engineering',   demand: 98, growth: '+340%', avgRate: '$185/hr' },
  { name: 'RAG & Vector DBs',        demand: 91, growth: '+280%', avgRate: '$165/hr' },
  { name: 'DevOps / Kubernetes',     demand: 88, growth: '+95%',  avgRate: '$145/hr' },
  { name: 'Cybersecurity',           demand: 82, growth: '+88%',  avgRate: '$160/hr' },
  { name: 'React / Next.js',         demand: 85, growth: '+60%',  avgRate: '$120/hr' },
  { name: 'Web3 / Smart Contracts',  demand: 74, growth: '+120%', avgRate: '$155/hr' },
  { name: 'Mobile (React Native)',   demand: 78, growth: '+45%',  avgRate: '$115/hr' },
];

export const liveCounterConfig = {
  githubCommitsPerSec:  { base: 8_400,       variance: 600     },
  newJobPostingsPerMin: { base: 142,          variance: 20      },
  openSourceRepos:      { base: 420_000_000,  variance: 0       },
  aiToolsAdoption:      { base: 67,           variance: 0       },
  devsOnline:           { base: 11_200_000,   variance: 50_000  },
  stackOverflowQsPerHr: { base: 2_400,        variance: 200     },
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

// Legacy region markers reused for dev hub cities
export interface RegionMarker {
  id: string;
  name: string;
  coordinates: [number, number];
}

export const devHubMarkers: RegionMarker[] = [
  { id: 'SFO', name: 'San Francisco',  coordinates: [-122.4449, 37.7558] },
  { id: 'NYC', name: 'New York',        coordinates: [-74.006,   40.7128] },
  { id: 'LON', name: 'London',          coordinates: [-0.1275,   51.5072] },
  { id: 'BER', name: 'Berlin',          coordinates: [13.405,    52.52]   },
  { id: 'BLR', name: 'Bangalore',       coordinates: [77.5946,   12.9716] },
  { id: 'BEI', name: 'Beijing',         coordinates: [116.4074,  39.9042] },
  { id: 'TKY', name: 'Tokyo',           coordinates: [139.6922,  35.6897] },
  { id: 'SYD', name: 'Sydney',          coordinates: [151.21,   -33.8678] },
  { id: 'TOR', name: 'Toronto',         coordinates: [-79.3832,  43.6532] },
  { id: 'SAO', name: 'São Paulo',       coordinates: [-46.6333, -23.55]   },
  { id: 'SIN', name: 'Singapore',       coordinates: [103.8,      1.3]    },
  { id: 'DXB', name: 'Dubai',           coordinates: [55.2972,   25.2631] },
  { id: 'PAR', name: 'Paris',           coordinates: [2.3522,    48.8567] },
  { id: 'SEO', name: 'Seoul',           coordinates: [126.99,    37.56]   },
  { id: 'AMS', name: 'Amsterdam',       coordinates: [4.9041,    52.3676] },
  { id: 'WAR', name: 'Warsaw',          coordinates: [21.0122,   52.2297] },
  { id: 'KHI', name: 'Karachi',         coordinates: [67.0099,   24.8607] },
  { id: 'LAG', name: 'Lagos',           coordinates: [3.3792,     6.5244] },
  { id: 'CPT', name: 'Cape Town',       coordinates: [18.4239,  -33.9253] },
  // ── New hub markers ──────────────────────────────────────────────────────────
  { id: 'ISB', name: 'Islamabad',       coordinates: [73.0479,   33.6844] },
  { id: 'LHR', name: 'Lahore',          coordinates: [74.3587,   31.5204] },
  { id: 'NRB', name: 'Nairobi',         coordinates: [36.8219,   -1.2921] },
  { id: 'PRG', name: 'Prague',          coordinates: [14.4378,   50.0755] },
  { id: 'TLV', name: 'Tel Aviv',        coordinates: [34.7818,   32.0853] },
  { id: 'BUC', name: 'Bucharest',       coordinates: [26.1025,   44.4268] },
  { id: 'CAS', name: 'Casablanca',      coordinates: [-7.5898,   33.5731] },
  { id: 'FSD', name: 'Faisalabad',      coordinates: [73.08969,  31.41554] },
];
