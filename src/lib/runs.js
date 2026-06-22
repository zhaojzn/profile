// Talks to the (formerly Stravify) backend that pulls each run's music + stats.
// These are public, read-only endpoints — the run pages are meant to be shared.
export const API_BASE_URL =
  "https://ck9gox2le1.execute-api.us-west-1.amazonaws.com";

// Accent used across the run pages + gallery to tie the running theme together.
export const RUN_ACCENT = "#fc5200"; // Strava orange

// Shared genre palette so a run's pie chart, its detail page, and its gallery
// card all color the same genre identically.
export const GENRE_COLORS = [
  "#fc5200", // strava orange
  "#f472b6", // pink
  "#a78bfa", // purple
  "#22d3ee", // cyan
  "#facc15", // yellow
  "#34d399", // green
  "#f87171", // soft red
  "#84cc16", // lime
  "#e879f9", // fuchsia
  "#60a5fa", // blue
];

export async function fetchRuns() {
  const res = await fetch(`${API_BASE_URL}/api/runs`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  return Array.isArray(data.items) ? data.items : [];
}

export async function fetchRun(id) {
  const res = await fetch(`${API_BASE_URL}/api/runs/${id}`);
  if (res.status === 404) throw new Error("Run not found.");
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

export function fmtDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function fmtDuration(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h ? `${h}h ${m}m` : `${m}m`;
}

export function fmtKm(m) {
  return (m / 1000).toFixed(2) + " km";
}

// Average pace (min/km) as a "m:ss /km" string — a runner-friendly headline stat.
export function fmtPace(distanceMeters, elapsedSeconds) {
  if (!distanceMeters || !elapsedSeconds) return "—";
  const minPerKm = elapsedSeconds / 60 / (distanceMeters / 1000);
  const m = Math.floor(minPerKm);
  const s = Math.round((minPerKm - m) * 60);
  return `${m}:${String(s).padStart(2, "0")} /km`;
}

export function fmtClock(iso) {
  return new Date(iso).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
}
