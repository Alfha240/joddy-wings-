import Reveal from "@/components/site/Reveal";
import { SHORTS } from "@/data/shorts";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import LiteYouTube from "@/components/site/LiteYouTube";
import { fetchYouTubeTitles } from "@/lib/yt";

export default function Shorts() {
  const [params] = useSearchParams();
  const [titles, setTitles] = useState<Record<string, string>>({});
  useEffect(() => {
    fetchYouTubeTitles(SHORTS.map((s) => s.id)).then(setTitles);
  }, []);
  useEffect(() => {
    const id = params.get("s");
    if (!id) return;
    const el = document.getElementById(`short-${id}`);
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
        <h1 className="text-4xl md:text-6xl font-minecrafter title-glow text-center mb-10 text-white">
          Shorts Showcase
        </h1>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {SHORTS.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <div
              id={`short-${s.id}`}
              className="glass-panel outline-glow p-3 hover-glow"
            >
              <LiteYouTube id={s.id} title={titles[s.id] || s.title} />
              <p className="mt-3 text-center text-white">{titles[s.id] || s.title}</p>
              <div className="mt-2 flex justify-center">
                <a
                  href="/downloads"
                  className="px-3 py-1.5 rounded-lg text-xs border-2 border-red-500 text-white/90 hover-glow"
                >
                  Go to Downloads
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
