export interface CountryData {
  value: number;
  color?: string;
}

export interface RegionMarker {
  id: string;
  name: string;
  coordinates: [number, number];
}

export const topCountries = [
  { code: "US", name: "United States", requests: 40774304356, color: "#1e40af" },
  { code: "DE", name: "Germany", requests: 6211054435, color: "#FFCE00" },
  { code: "GB", name: "United Kingdom", requests: 4951724702, color: "#2563eb" },
  { code: "IN", name: "India", requests: 4357156091, color: "#f59e0b" },
  { code: "BR", name: "Brazil", requests: 3932756153, color: "#FF0000" },
  { code: "SG", name: "Singapore", requests: 3806778302, color: "#f59e0b" },
  { code: "JP", name: "Japan", requests: 3690185948, color: "#dc143c" },
];

export const countryRequests: Record<string, CountryData> = {
  US: { value: 40774304356, color: "#1e40af" },
  DE: { value: 6211054435, color: "#FFCE00" },
  GB: { value: 4951724702, color: "#2563eb" },
  IN: { value: 4357156091, color: "#f59e0b" },
  BR: { value: 3932756153, color: "#FF0000" },
  SG: { value: 3806778302, color: "#f59e0b" },
  JP: { value: 3690185948, color: "#dc143c" },
  FR: { value: 3511746816, color: "#1d4ed8" },
  CA: { value: 3308254672, color: "#b91c1c" },
  SE: { value: 2456891234, color: "#2563eb" },
  AU: { value: 2234567890, color: "#3b82f6" },
  KR: { value: 2123456789, color: "#3b82f6" },
  NL: { value: 1987654321, color: "#ea580c" },
  NO: { value: 1876543210, color: "#dc2626" },
  CN: { value: 1765432109, color: "#991b1b" },
  ES: { value: 1654321098, color: "#b91c1c" },
  DK: { value: 1543210987, color: "#dc2626" },
  FI: { value: 1432109876, color: "#3b82f6" },
  IT: { value: 1321098765, color: "#15803d" },
  HK: { value: 1210987654, color: "#b91c1c" },
  IE: { value: 1109876543, color: "#16a34a" },
  PL: { value: 998765432, color: "#dc2626" },
  ID: { value: 887654321, color: "#b91c1c" },
  TH: { value: 776543210, color: "#2563eb" },
  MX: { value: 665432109, color: "#15803d" },
  CH: { value: 554321098, color: "#dc2626" },
  VN: { value: 443210987, color: "#b91c1c" },
  PH: { value: 332109876, color: "#2563eb" },
  TR: { value: 221098765, color: "#b91c1c" },
  BE: { value: 198765432, color: "#525252" },
  AR: { value: 187654321, color: "#3b82f6" },
  AT: { value: 176543210, color: "#dc2626" },
  RU: { value: 165432109, color: "#2563eb" },
  ZA: { value: 154321098, color: "#16a34a" },
};

export const regionMarkers: RegionMarker[] = [
  { id: "hnd1", name: "Tokyo", coordinates: [139.6922, 35.6897] },
  { id: "kix1", name: "Osaka", coordinates: [135.5023, 34.6937] },
  { id: "bom1", name: "Mumbai", coordinates: [72.8775, 19.0761] },
  { id: "gru1", name: "Sao Paulo", coordinates: [-46.6333, -23.55] },
  { id: "icn1", name: "Seoul", coordinates: [126.99, 37.56] },
  { id: "iad1", name: "Virginia", coordinates: [-77.0163, 38.9047] },
  { id: "sfo1", name: "San Francisco", coordinates: [-122.4449, 37.7558] },
  { id: "cle1", name: "Cleveland", coordinates: [-81.6805, 41.4764] },
  { id: "pdx1", name: "Portland", coordinates: [-122.65, 45.5371] },
  { id: "lhr1", name: "London", coordinates: [-0.1275, 51.5072] },
  { id: "cdg1", name: "Paris", coordinates: [2.3522, 48.8567] },
  { id: "cpt1", name: "Cape Town", coordinates: [18.4239, -33.9253] },
  { id: "hkg1", name: "Hong Kong", coordinates: [114.2, 22.3] },
  { id: "sin1", name: "Singapore", coordinates: [103.8, 1.3] },
  { id: "syd1", name: "Sydney", coordinates: [151.21, -33.8678] },
  { id: "fra1", name: "Frankfurt", coordinates: [8.6822, 50.1106] },
  { id: "dxb1", name: "Dubai", coordinates: [55.2972, 25.2631] },
  { id: "arn1", name: "Stockholm", coordinates: [18.0686, 59.3294] },
  { id: "dub1", name: "Dublin", coordinates: [-6.2603, 53.35] },
];

export const stats = {
  totalRequests: 115832282051,
  totalDeployments: 6120247,
  firewallActions: {
    total: 7507223309,
    systemBlocks: 1398205677,
    systemChallenges: 3171279448,
    customWafBlocks: 328783789,
  },
  botManagement: {
    botsBlocked: 415683895,
    humansVerified: 2408122336,
  },
  cacheHits: 78945678901,
  isrRevalidations: 1234567890,
  aiGatewayRequests: 24086391,
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString("en-US");
};
