import { useEffect, useState } from "react";
import { categories, planOrder, type Category, type PlanName } from "../data";

export const DISCORD = "https://discord.gg/ZTyrbfNFpX";

function Icon({ type }: { type: Category["icon"] }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (type === "pc")
    return (
      <svg {...common}>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    );
  if (type === "mobilator")
    return (
      <svg {...common}>
        <rect x="2" y="5" width="15" height="11" rx="2" />
        <rect x="14" y="9" width="8" height="12" rx="1.5" />
        <path d="M6 20h5" />
      </svg>
    );
  return (
    <svg {...common}>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </svg>
  );
}

const planBlurb: Record<PlanName, string> = {
  Combo: "Sensi + Optimization — best value",
  Sensi: "Perfect sensitivity pack",
  Optimization: "Max FPS & performance",
};

export default function Pricing({ onClose }: { onClose: () => void }) {
  const [catId, setCatId] = useState<Category["id"]>("pc");
  const [plan, setPlan] = useState<PlanName>("Combo");
  const cat = categories.find((c) => c.id === catId)!;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const visible = cat.sections.filter((s) => s.plans.includes(plan));

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#05030a]/95 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-purple-700/25 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold tracking-[0.3em] text-purple-300">MESSI SENSI</div>
          <button
            onClick={onClose}
            className="rounded-full border border-purple-500/40 bg-purple-500/10 px-5 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-500/30"
          >
            ✕ Close
          </button>
        </div>

        <div className="pop-in mt-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-400">Pricing</p>
          <h2 className="mt-3 text-4xl font-black sm:text-6xl">
            Choose your <span className="text-gradient">device</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
            PC, Mobilator ya Mobile — apna device chuno, phir plan select karo aur features dekho.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {categories.map((c) => {
            const active = c.id === catId;
            return (
              <button
                key={c.id}
                data-hover
                onClick={() => setCatId(c.id)}
                className={`group relative overflow-hidden rounded-2xl p-5 text-left transition duration-300 ${
                  active
                    ? "bg-gradient-to-br from-purple-600/50 to-purple-950/70 ring-2 ring-purple-400 shadow-[0_0_50px_-5px_rgba(168,85,247,0.7)]"
                    : "glass hover:-translate-y-1 hover:border-purple-400/60"
                }`}
              >
                <div className={`mb-3 ${active ? "text-white" : "text-purple-400 group-hover:text-purple-200"}`}>
                  <Icon type={c.icon} />
                </div>
                <div className="text-xl font-extrabold tracking-wider">{c.label}</div>
                <div className="mt-1 text-xs text-zinc-400">{c.tag}</div>
                <div className="mt-3 text-sm text-purple-200">
                  Starts ₹{Math.min(...Object.values(c.prices))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Plans */}
        <div key={catId} className="mt-8 grid gap-4 md:grid-cols-3">
          {planOrder.map((p, i) => {
            const active = p === plan;
            return (
              <button
                key={p}
                data-hover
                onClick={() => setPlan(p)}
                style={{ animationDelay: `${i * 80}ms` }}
                className={`pop-in relative rounded-2xl p-6 text-left transition duration-300 hover:-translate-y-1 ${
                  active
                    ? "bg-gradient-to-b from-purple-500/25 to-black ring-2 ring-purple-400"
                    : "glass hover:border-purple-400/60"
                }`}
              >
                {p === "Combo" && (
                  <span className="absolute right-4 top-4 rounded-full bg-purple-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                    Best value
                  </span>
                )}
                <div className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-300">{p}</div>
                <div className="mt-4 flex items-end gap-1">
                  <span className="text-lg text-purple-300">₹</span>
                  <span className="text-5xl font-black leading-none">{cat.prices[p]}</span>
                </div>
                <div className="mt-3 text-xs text-zinc-400">{planBlurb[p]}</div>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div key={catId + plan} className="glass pop-in mt-8 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-black tracking-wide sm:text-3xl">
              <span className="text-gradient">{cat.heading}</span>
            </h3>
            <span className="rounded-full border border-purple-400/40 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-purple-200">
              {cat.label} • {plan} • ₹{cat.prices[plan]}
            </span>
          </div>

          <div className="mt-8 space-y-8">
            {visible.map((s) => (
              <div key={s.title || "all"}>
                {s.title && (
                  <h4 className="mb-4 text-lg font-extrabold uppercase tracking-[0.3em] text-purple-300">
                    {s.title}
                  </h4>
                )}
                <ul className="grid gap-3 sm:grid-cols-2">
                  {s.items.map((it, i) => (
                    <li
                      key={it}
                      style={{ animationDelay: `${i * 40}ms` }}
                      className="fade-up flex items-start gap-3 rounded-xl border border-purple-500/15 bg-black/40 px-4 py-3 text-[15px] font-semibold italic text-zinc-100 transition hover:border-purple-400/60 hover:bg-purple-500/10"
                    >
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-purple-400 shadow-[0_0_10px_#a855f7]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="btn-glow mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 text-base font-bold"
          >
            Buy {plan} — ₹{cat.prices[plan]} on Discord →
          </a>
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">Developed By Dexter</p>
      </div>
    </div>
  );
}
