// ---------------------------------------------------------------------------
// Thin, SSR-safe localStorage wrapper.
//
// Next.js renders on the server first; `window`/`localStorage` don't exist
// there. Every function here guards for that so it's safe to call from a
// client component's first render without crashing during SSR. Values are
// JSON-serialized under a single `palestra:` key prefix so this can't
// collide with anything else on the origin.
//
// Deliberately minimal: no backend, no external dependency, no wrapper
// library — just JSON.stringify/parse against window.localStorage. This is
// the one piece of new infrastructure Stage 4 needs (Execution -> Completion
// -> Progress all read/write through it); everything built on top of it
// should go through these functions rather than touching localStorage
// directly, so the SSR guard and error handling stay in one place.
// ---------------------------------------------------------------------------

const PREFIX = "palestra:";

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Read and JSON-parse a value. Returns `null` for: not in a browser, key
 * never set, corrupted JSON, or localStorage disabled (e.g. private
 * browsing in some browsers throws on access) — callers should treat
 * `null` as "nothing stored" and fall back to an empty/default state
 * rather than distinguishing why it's null.
 */
export function readStorage<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * JSON-stringify and write a value. Returns whether the write actually
 * succeeded, so callers that care (rare) can react — most callers can
 * ignore the return value, since a failed write degrades to "this session
 * won't persist," not a crash.
 */
export function writeStorage<T>(key: string, value: T): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeStorage(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // Nothing meaningful to do if even removal fails.
  }
}

// Centralized key names so Milestones B/C/D can't drift into typo'd or
// duplicated keys across files.
export const STORAGE_KEYS = {
  activeWorkout: "active-workout",
  history: "history",
} as const;
