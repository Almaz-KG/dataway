import type { RecentWorkspaceEntry } from "../_types/workspace";

const FAVORITES_KEY = "dataway-favorites";
const RECENT_KEY = "dataway-recent";

export function readFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function writeFavorites(ids: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    /* noop */
  }
}

export function readRecent(): RecentWorkspaceEntry[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as RecentWorkspaceEntry[]) : [];
  } catch {
    return [];
  }
}

export function writeRecent(entries: RecentWorkspaceEntry[]): void {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(entries));
  } catch {
    /* noop */
  }
}
