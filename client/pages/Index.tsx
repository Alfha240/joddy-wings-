import Reveal from "@/components/site/Reveal";
import { Link } from "react-router-dom";
import HeroParallax from "@/components/site/HeroParallax";

export default function Index() {
  return (
    <section className="relative py-0">
      <div className="container relative z-10 mx-auto">
        {/* Blank hero for future layered art */}
        <div className="relative mx-auto max-w-[1600px] h-[44vh]"></div>

        {/* Features row */}
        <div className="mt-10 glass-panel outline-glow rounded-2xl p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                t: "MODS",
                d: "Enhance gameplay with optimized, exciting features.",
              },
              {
                t: "PLUGINS",
                d: "Server‑ready tools crafted for performance.",
              },
              {
                t: "TEXTURE PACKS",
                d: "Crisp visuals with metallic blue accents.",
              },
              { t: "MORE", d: "Command packs, datapacks, and utilities." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <div className="rounded-xl bg-white/5 border border-white/15 p-4 md:p-5 hover-glow">
                  <h3 className="font-minecrafter text-white/95 text-xl">
                    {c.t}
                  </h3>
                  <p className="mt-2 text-slate-200/90 text-sm leading-relaxed">
                    {c.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-4 flex gap-3 justify-center">
            <Link
              to="/shorts"
              className="px-3 py-1.5 rounded-lg text-xs border border-white/20 text-white/80 hover-glow"
            >
              Shorts
            </Link>
            <Link
              to="/downloads"
              className="px-3 py-1.5 rounded-lg text-xs border border-white/20 text-white/80 hover-glow"
            >
              Downloads
            </Link>
          </div>
        </div>

        {/* Community CTA */}
        <div className="mt-10 rounded-2xl glass-panel outline-glow p-8 md:p-10 text-center">
          <Reveal>
            <h2 className="font-minecrafter text-2xl md:text-4xl text-white/95">
              CRAFTED FOR THE COMMUNITY
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-3 text-slate-200/90 max-w-2xl mx-auto">
              Discover exclusive free Minecraft mods, plugins, and texture packs
              to level up your gameplay.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-5">
              <Link
                to="/about"
                className="px-5 py-2.5 rounded-xl border border-white/25 text-white/90 hover:text-white hover-glow whitespace-nowrap text-sm sm:text-base"
              >
                Learn more about Steel Wing
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
