import { useEffect, useMemo, useState } from "react";
import { SHORTS } from "@/data/shorts";
import { FILES } from "@/data/files";
import { fetchYouTubeTitles } from "@/lib/yt";

export default function Search({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [q, setQ] = useState("");
  const [dq, setDQ] = useState("");
  const [ytTitles, setYtTitles] = useState<Record<string, string>>({});
  useEffect(() => {
    const t = setTimeout(() => setDQ(q.trim()), 80);
    return () => clearTimeout(t);
  }, [q]);
  useEffect(() => {
    fetchYouTubeTitles(SHORTS.map((s) => s.id)).then(setYtTitles);
  }, []);
  const results = useMemo(() => {
    const query = dq.toLowerCase();
    if (!query) return [] as { label: string; sub: string; href: string }[];

    const starts = (s: string) => s.toLowerCase().startsWith(query);

    const shorts = SHORTS.filter((s) => starts(ytTitles[s.id] || s.title)).map(
      (s) => ({
        label: ytTitles[s.id] || s.title,
        sub: "Shorts",
        href: `/shorts?s=${encodeURIComponent(s.id)}`,
      }),
    );

    const files = FILES.filter((f) => starts(f.name)).map((f) => ({
      label: f.name,
      sub: "Download",
      href: `/downloads?f=${encodeURIComponent(f.name)}`,
    }));

    return [...shorts, ...files].slice(0, 12);
  }, [dq]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-[92%] max-w-2xl glass-panel outline-glow p-4 will-change-transform">
        <div className="flex items-center gap-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" />
          </svg>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Shorts and Downloads..."
            className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded-md border border-white/20 text-white/80 hover-glow"
          >
            Esc
          </button>
        </div>
        <div className="mt-3 max-h-80 overflow-y-auto grid gap-2">
          {q && results.length === 0 && (
            <div className="text-white/70 text-sm">No results</div>
          )}
          {results.map((r, i) => (
            <a
              key={i}
              href={r.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-lg px-3 py-2 bg-white/5 border border-white/15 hover-glow"
            >
              <span className="text-white">{r.label}</span>
              <span className="text-xs text-white/60">{r.sub}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
