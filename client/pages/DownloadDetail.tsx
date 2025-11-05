import { Link, Navigate, useParams } from "react-router-dom";
import { FILES } from "@/data/files";
import Reveal from "@/components/site/Reveal";
import { ArrowLeft, Download } from "lucide-react";

export default function DownloadDetail() {
  const { slug } = useParams<{ slug: string }>();
  const file = FILES.find((f) => f.slug === slug);

  if (!file) {
    return <Navigate to="/downloads" replace />;
  }

  const related = FILES.filter((f) => f.slug !== file.slug).slice(0, 3);

  return (
    <section
      className="relative min-h-[70vh] py-12 sm:py-16"
      style={{ backgroundColor: "#05160e" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between flex-wrap gap-3 text-sm text-white/80">
          <Link
            to="/downloads"
            className="inline-flex items-center gap-2 rounded-xl border border-[#0f4b2e]/60 bg-[#0b1a14]/70 px-4 py-2 hover-glow"
          >
            <ArrowLeft className="h-4 w-4" /> Back to downloads
          </Link>
        </div>

        <Reveal className="mt-6">
          <article className="relative overflow-hidden rounded-[36px] border border-[#0f4b2e] bg-[#0b1a14]/90 shadow-[0_0_48px_rgba(15,75,46,0.28)]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(60% 90% at 20% 30%, rgba(31,141,86,0.4), transparent 75%), radial-gradient(55% 95% at 80% 40%, rgba(31,141,86,0.35), transparent 78%)",
              }}
            />
            <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[280px_1fr]">
              <div className="flex flex-col items-center gap-5">
                <div className="rounded-3xl border border-white/25 bg-white/10 p-6 shadow-glow">
                  <img
                    src={file.logo}
                    alt={`${file.name} logo`}
                    className="h-40 w-40 object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const t = e.target as HTMLImageElement;
                      if (
                        t.src !==
                        window.location.origin + "/placeholder.svg"
                      ) {
                        t.src = "/placeholder.svg";
                      }
                    }}
                  />
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#8ef5b2]">
                  {file.tag}
                </span>
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-minecrafter text-white leading-tight">
                    {file.name}
                  </h1>
                  <p className="mt-4 text-base sm:text-lg text-white/85 leading-relaxed">
                    {file.desc}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={file.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-download inline-flex gap-2"
                  >
                    <Download className="h-4 w-4" /> Download
                  </a>
                  <span className="text-xs text-white/60">
                    Opens in a new tab via secure redirect.
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg sm:text-xl font-minecrafter text-white/90 mb-4">
              Explore more downloads
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {related.map((item) => (
                <Reveal key={item.slug}>
                  <Link
                    to={`/downloads/${item.slug}`}
                    className="block rounded-2xl border border-[#0f4b2e]/70 bg-[#0b1a14]/70 p-4 sm:p-5 hover-glow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="rounded-xl border border-white/20 bg-white/10 p-3">
                        <img
                          src={item.logo}
                          alt={`${item.name} logo`}
                          className="h-14 w-14 object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8ef5b2]">
                          {item.tag}
                        </span>
                        <h3 className="mt-2 text-base font-semibold text-white leading-tight">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
