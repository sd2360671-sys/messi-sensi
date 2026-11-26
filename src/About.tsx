import { useEffect } from "react";
import { DISCORD } from "./Pricing";

export default function About({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const rows = [
    { k: "Developer", v: "Dexter", href: undefined as string | undefined },
    { k: "Contact", v: DISCORD, href: DISCORD },
    { k: "Developer Yt , Ig", v: "@dexterffxd", href: undefined },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass pop-in relative w-full max-w-lg overflow-hidden rounded-3xl p-8 shadow-[0_0_80px_-10px_rgba(168,85,247,0.6)]"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-purple-600/40 blur-3xl" />
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-purple-500/40 px-3 py-1 text-sm text-purple-200 hover:bg-purple-500/30"
        >
          ✕
        </button>
        <p className="text-xs uppercase tracking-[0.4em] text-purple-400">About</p>
        <h3 className="mt-2 text-4xl font-black">
          <span className="text-gradient">Messi Sensi</span>
        </h3>

        <div className="mt-8 space-y-4">
          {rows.map((r) => (
            <div key={r.k} className="rounded-2xl border border-purple-500/20 bg-black/50 px-5 py-4">
              <div className="text-xs font-semibold uppercase tracking-widest text-purple-300">{r.k}</div>
              {r.href ? (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block break-all text-lg font-semibold text-white underline decoration-purple-500 underline-offset-4 hover:text-purple-300"
                >
                  {r.v}
                </a>
              ) : (
                <div className="mt-1 text-lg font-semibold">{r.v}</div>
              )}
              {r.k.startsWith("Developer Yt") && (
                <div className="mt-2 flex gap-4 text-sm">
                  <a
                    href="https://www.youtube.com/@dexterffxd"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-300 underline underline-offset-4 hover:text-white"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.instagram.com/dexterffxd"
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-300 underline underline-offset-4 hover:text-white"
                  >
                    Instagram
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-zinc-400">Developed By Dexter</p>
      </div>
    </div>
  );
}
