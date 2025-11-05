import { Link } from "react-router-dom";

export default function HomeCTA() {
  return (
    <section className="w-full" style={{ backgroundColor: "#05160e" }}>
      <div className="container mx-auto px-4 mt-6 sm:mt-10 pb-12 sm:pb-14">
        <div className="relative overflow-hidden rounded-[32px] border border-[#0f4b2e] bg-[#0b1a14]/85 shadow-[0_0_36px_rgba(15,75,46,0.3)]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(55% 90% at 18% 30%, rgba(31,141,86,0.45), transparent 72%), radial-gradient(60% 95% at 82% 40%, rgba(31,141,86,0.35), transparent 78%)",
            }}
          />
          <div className="relative flex flex-col items-center gap-4 px-6 py-8 text-center sm:px-10 sm:py-12">
            <h2 className="text-2xl sm:text-3xl font-minecrafter text-white tracking-wide">
              Crafted for the Community
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-white/85">
              Discover exclusive free Minecraft mods, plugins, texture packs, and utilities crafted to level up
              every adventure. Stay tuned for fresh drops direct from Steel Wing.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/shorts" className="btn-cta">
                Shorts
              </Link>
              <Link to="/downloads" className="btn-cta">
                Downloads
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
