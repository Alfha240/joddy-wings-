import Reveal from "@/components/site/Reveal";
import { FILES, type FileItem } from "@/data/files";
import { BUNDLES } from "@/data/bundles";
import { useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { usePinnedScroll } from "@/hooks/use-pinned-scroll";

export default function Files() {
  const [params] = useSearchParams();

  const selectedFile = useMemo(() => {
    const value = params.get("f");
    if (!value) return null;
    const decoded = decodeURIComponent(value);
    return (
      FILES.find((f) => f.slug === decoded) ||
      FILES.find((f) => f.slug === value) ||
      FILES.find((f) => f.name === decoded) ||
      null
    );
  }, [params]);

  const targetEl = selectedFile
    ? document.getElementById(`file-${selectedFile.slug}`)
    : null;
  usePinnedScroll(targetEl, {
    durationMs: 1600,
    block: "start",
    behavior: "auto",
  });

  useEffect(() => {
    if (!selectedFile || !targetEl) return;
    targetEl.classList.add("search-glow-green");
    const t = setTimeout(
      () => targetEl.classList.remove("search-glow-green"),
      4000,
    );
    return () => clearTimeout(t);
  }, [selectedFile, targetEl]);

  const activeBundle = useMemo(() => {
    const id = params.get("bundle");
    if (!id) return null;
    const b = BUNDLES.find((x) => x.id === id);
    if (!b) return null;
    const items = b.items
      .map((name) => FILES.find((f) => f.name === name))
      .filter(Boolean) as FileItem[];
    return { ...b, items };
  }, [params]);

  const activeFile = selectedFile;

  const Card = ({ f }: { f: FileItem }) => (
    <article
      id={`file-${f.slug}`}
      className="rounded-2xl overflow-visible hover-glow bg-transparent border scroll-mt-24 h-full"
      style={{ borderColor: "#0f4b2e" }}
    >
      <div className="grid gap-4 sm:gap-5 p-4 sm:p-6 grid-cols-1">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-2xl bg-white/12 border border-white/25 p-3 shadow-glow">
            <img
              src={f.logo}
              alt={`${f.name} logo`}
              className="h-16 w-16 object-contain"
              loading="lazy"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                if (t.src !== window.location.origin + "/placeholder.svg")
                  t.src = "/placeholder.svg";
              }}
            />
          </div>
          <span className="text-[10px] md:text-xs px-2 py-1 rounded-md bg-[#0f4b2e]/20 text-[#8ef5b2] border border-[#1f8d56]/40 whitespace-nowrap">
            {f.tag}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-minecrafter text-lg md:text-2xl text-white/95 leading-tight break-words">
            {f.name}
          </h3>
          <p className="text-white/90 leading-relaxed text-sm md:text-base break-words">
            {f.desc}
          </p>
          <div className="pt-2">
            <Link
              to={`/downloads/${f.slug}`}
              className="btn-download inline-flex gap-2 animate-bounce-in"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
              Download
            </Link>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <section
      className="relative py-10 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto"
      style={{ backgroundColor: "#05160e" }}
    >
      <Reveal>
        <h1 className="text-3xl md:text-5xl font-minecrafter text-center mb-6 text-white">
          Downloads
        </h1>
      </Reveal>

      {activeBundle ? (
        <div className="mb-10">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-minecrafter text-center text-white mb-4">
              {activeBundle.title}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {activeBundle.items.map((f, i) => (
              <Reveal key={f.slug} delay={i * 90}>
                <Card f={f} />
              </Reveal>
            ))}
          </div>
        </div>
      ) : activeFile ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          <Reveal>
            <Card f={activeFile} />
          </Reveal>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {FILES.map((f, i) => (
            <Reveal key={f.slug} delay={i * 60}>
              <Card f={f} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
