import prisma from "./prisma";

export type SettingsMap = Record<string, string>;

let cache: SettingsMap | null = null;
let cachedAt = 0;
const TTL_MS = 60_000;

export async function getSettings(): Promise<SettingsMap> {
  const now = Date.now();
  if (cache && now - cachedAt < TTL_MS) return cache;

  try {
    const rows = await prisma.setting.findMany();
    const map: SettingsMap = {};
    for (const row of rows) map[row.key] = row.value;
    cache = map;
    cachedAt = now;
    return map;
  } catch (e) {
    console.error("getSettings failed", e);
    return cache || {};
  }
}

export function invalidateSettingsCache() {
  cache = null;
  cachedAt = 0;
}

export async function getSetting(key: string, fallback = ""): Promise<string> {
  const s = await getSettings();
  return s[key] ?? fallback;
}
