import { useLocation } from "react-router-dom";
export default function Parallax() {
  const dots = Array.from({ length: 8 });
  const blocks = Array.from({ length: 6 });
  const { pathname } = useLocation();
  const showMinecraftBg = pathname !== "/";
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-20 overflow-hidden"
    >
      {/* Metallic blue/grey/white animated gradient */}
      <div className="absolute inset-0 [background:radial-gradient(60%_40%_at_20%_10%,rgba(130,170,255,.20),transparent_60%),radial-gradient(60%_40%_at_80%_0%,rgba(156,173,206,.18),transparent_60%),linear-gradient(120deg,#0b1b36,#0f2344,#123057,#0b1b36)] bg-[length:220%_220%] animate-pan motion-reduce:animate-none" />

      {showMinecraftBg && (
        <img
          src="/bg-minecraft.svg"
          alt="minecraft background"
          className="absolute inset-0 w-full h-full object-cover opacity-65 blur-[1px] mix-blend-screen"
          loading="eager"
          decoding="async"
        />
      )}

      {/* Pixel/voxel blocks as subtle Minecraft touch */}
      <div className="absolute inset-0">
        {blocks.map((_, i) => (
          <span
            key={i}
            className="absolute rounded-[4px] bg-gradient-to-br from-[#5d7ff8]/30 to-[#9fb2ff]/20 border border-white/20 shadow-[0_0_20px_rgba(130,170,255,.25)] animate-block-float motion-reduce:animate-none"
            style={{
              left: `${(i * 97) % 100}%`,
              top: `${(i * 53) % 100}%`,
              width: `${24 + (i % 3) * 10}px`,
              height: `${24 + (i % 3) * 10}px`,
              animationDelay: `${(i % 5) * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Twinkling particles */}
      <div className="absolute inset-0">
        {dots.map((_, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(130,170,255,.9)] animate-twinkle motion-reduce:animate-none"
            style={{
              left: `${(i * 67) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Scrims for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,12,24,.55)] via-[rgba(6,12,24,.3)] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(520px_360px_at_20%_50%,rgba(6,12,24,.55),transparent_72%)]" />

      {/* Gentle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_65%,rgba(0,0,0,.12))]" />
    </div>
  );
}
