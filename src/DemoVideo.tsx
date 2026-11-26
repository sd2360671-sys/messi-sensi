import { useRef, useState } from "react";

// MediaFire page link (original) + direct streamable file link
export const MEDIAFIRE_PAGE =
  "https://www.mediafire.com/file/1lr9hm92wxpydfa/lv_0_20261031235842.mp4/file";
const DIRECT_SRC =
  "https://download1650.mediafire.com/tgwhvfxogj8gWgA4o6thoQRb5xV5K8WF81mFlTTc89nc1CLOKaUxH3p_w_HKQ0L-C5ipAKcjJyX-yX6d9gHi8sBhyxgDQo_o8HACx71iQwLeGUZBTFY6r4zUjNHaUMhSQgNRnX7StYP4VucKQD6n_-RZN45quoT27VFfsBEERtsb/1lr9hm92wxpydfa/lv_0_20261031235842.mp4";

export default function DemoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const start = () => {
    setStarted(true);
    setLoading(true);
    setFailed(false);
    // video element mounts after state update
    requestAnimationFrame(() => ref.current?.play().catch(() => {}));
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {started && !failed && (
        <video
          ref={ref}
          src={DIRECT_SRC}
          controls
          autoPlay
          playsInline
          preload="auto"
          onCanPlay={() => setLoading(false)}
          onPlaying={() => setLoading(false)}
          onError={() => {
            setFailed(true);
            setLoading(false);
          }}
          className="h-full w-full bg-black"
        />
      )}

      {!started && (
        <button
          data-hover
          onClick={start}
          className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[radial-gradient(circle_at_center,rgba(126,34,206,0.45),#05030a_70%)]"
        >
          <span className="btn-glow flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-600 transition group-hover:scale-110">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-purple-200">
            Play Demo
          </span>
        </button>
      )}

      {started && loading && !failed && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-500/30 border-t-purple-400" />
          <span className="text-xs uppercase tracking-[0.3em] text-purple-200">Loading video…</span>
        </div>
      )}

      {failed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black px-6 text-center">
          <p className="text-zinc-300">Video yahan load nahi ho paayi.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={start}
              className="rounded-full border border-purple-500/50 px-6 py-3 font-semibold text-purple-100 hover:bg-purple-500/20"
            >
              Retry
            </button>
            <a
              href={MEDIAFIRE_PAGE}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-semibold"
            >
              Open Video ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
