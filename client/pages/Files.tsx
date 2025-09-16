import Reveal from "@/components/site/Reveal";
import { FILES } from "@/data/files";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Files() {
  const [params] = useSearchParams();
  useEffect(() => {
    const q = params.get("f");
    if (!q) return;
    const el = document.getElementById(`file-${q}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      el.classList.add("search-highlight");
      const t = setTimeout(() => el.classList.remove("search-highlight"), 2600);
      return () => clearTimeout(t);
    }
  }, [params]);

  return (
    <section className="relative py-16 container mx-auto">
      <Reveal>
        <h1 className="text-4xl md:text-6xl font-minecrafter title-glow text-center mb-10">
          Files Showcase
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FILES.map((f, i) => (
          <Reveal key={f.name} delay={i * 100}>
            <article
              id={`file-${f.name}`}
              className="rounded-2xl overflow-hidden hover-glow bg-slate-900/80 border border-white/20"
            >
              <div className="flex gap-5 p-6 items-start">
                <div className="shrink-0 rounded-xl bg-white/15 p-2 border border-white/30 shadow-glow">
                  <img
                    src={f.logo}
                    alt={`${f.name} logo`}
                    className="h-16 w-16 object-contain" loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-minecrafter text-2xl text-white/95">
                      {f.name}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-md bg-primary/20 text-primary border border-primary/40">
                      {f.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-white/90 leading-relaxed">{f.desc}</p>
                  <div className="mt-5">
                    <a
                      href={f.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
