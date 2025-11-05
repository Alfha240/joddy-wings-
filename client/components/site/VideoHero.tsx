import { useEffect, useRef } from "react";

export default function VideoHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Ensure autoplay on iOS/Android; retry on readiness and orientation changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      v.play().catch(() => void 0);
    };
    tryPlay();
    const onCanPlay = () => tryPlay();
    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    const onOrientation = () => tryPlay();
    v.addEventListener("canplay", onCanPlay as any, { passive: true } as any);
    document.addEventListener("visibilitychange", onVisibility, {
      passive: true,
    } as any);
    window.addEventListener("orientationchange", onOrientation, {
      passive: true,
    } as any);
    return () => {
      v.removeEventListener("canplay", onCanPlay as any);
      document.removeEventListener("visibilitychange", onVisibility as any);
      window.removeEventListener("orientationchange", onOrientation as any);
    };
  }, []);

  return (
    <section
      id="home-video"
      className="relative w-full bg-[#05160e]"
    >
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full aspect-[16/9] lg:aspect-auto lg:min-h-[calc(100vh-88px)] lg:max-h-[calc(100vh-88px)]">
          <video
            ref={videoRef}
            className="pointer-events-none absolute inset-0 h-full w-full object-contain sm:object-cover object-center"
            src="https://cdn.builder.io/o/assets%2F9fb80d7fad534337856f857bfc00a930%2Fd6c0042dfb364e34b01db866d5e475c6?alt=media&token=6b641025-7642-4104-8af2-3c59aefbd19d&apiKey=9fb80d7fad534337856f857bfc00a930"
            aria-hidden="true"
            role="presentation"
            preload="auto"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            crossOrigin="anonymous"
          />
        </div>
      </div>
    </section>
  );
}
