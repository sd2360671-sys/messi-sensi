import CursorFX from "./CursorFX";
import Pricing from "./Pricing";
import About from "./About";
import DemoVideo from "./DemoVideo";

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className="inline-block transition-transform duration-200 ease-out"
      onPointerMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
        el.style.transform = `translate(${x}px,${y}px)`;
      }}
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
    >
      {children}
    </div>
  );
}

function Tilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div style={{ perspective: 1200 }}>
      <div
        ref={ref}
        className="transition-transform duration-200 ease-out"
        onPointerMove={(e) => {
          const el = ref.current!;
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
        }}
        onPointerLeave={() => {
          if (ref.current) ref.current.style.transform = "rotateY(0) rotateX(0)";
        }}
      >
        {children}
      </div>
    </div>
  );
}

const marquee = [
  "Perfect Sensitivity",
  "Brutal DPI",
  "No Recoil",
  "Fps Booster",
  "Removed Aimshake",
  "Smooth Aim",
  "Windows Optimization",
  "Paid Emulator",
];

export default function App() {
  const [showPricing, setShowPricing] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#05030a] text-white">
      <CursorFX />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-purple-500/20 bg-black/50 px-5 py-3 backdrop-blur-xl sm:px-7">
          <a href="#top" className="flex items-center gap-2 font-black tracking-[0.2em]">
            <span className="h-3 w-3 rounded-full bg-purple-500 shadow-[0_0_14px_#a855f7]" />
            MESSI SENSI
          </a>
          <nav className="flex items-center gap-2 text-sm sm:gap-5">
            <a href="#demo" className="hidden text-zinc-300 transition hover:text-purple-300 sm:block">
              Demo
            </a>
            <button
              onClick={() => setShowAbout(true)}
              className="rounded-full px-4 py-2 text-zinc-200 transition hover:bg-purple-500/20 hover:text-white"
            >
              About
            </button>
            <button
              onClick={() => setShowPricing(true)}
              className="rounded-full bg-purple-600 px-5 py-2 font-semibold transition hover:bg-purple-500"
            >
              Paid Sensi
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-700/30 blur-[140px]" />
        {/* orbit rings */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/20 sm:h-[760px] sm:w-[760px]"
          style={{ animation: "orbit 40s linear infinite" }}
        >
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 rounded-full bg-purple-400 shadow-[0_0_20px_#a855f7]" />
        </div>
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/20 sm:h-[520px] sm:w-[520px]"
          style={{ animation: "orbit 26s linear infinite reverse" }}
        >
          <span className="absolute -bottom-1.5 left-1/2 h-2 w-2 rounded-full bg-fuchsia-400 shadow-[0_0_16px_#e879f9]" />
        </div>

        <div className="relative z-10 text-center">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-purple-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
            Sensitivity • Optimization • FPS
          </div>
          <h1
            className="fade-up mt-8 text-6xl font-black leading-[0.95] tracking-tight sm:text-8xl md:text-[9rem]"
            style={{ animationDelay: "120ms" }}
          >
            <span className="text-gradient">MESSI</span>
            <br />
            <span className="text-white">SENSI</span>
          </h1>
          <p
            className="fade-up mx-auto mt-8 max-w-xl text-base text-zinc-400 sm:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            Perfect sensitivity, brutal aim technique aur max FPS — PC, Mobilator aur Mobile ke liye.
            Ek hi jagah, ek hi click.
          </p>
          <div className="fade-up mt-10 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "360ms" }}>
            <Magnetic>
              <button
                onClick={() => setShowPricing(true)}
                className="btn-glow rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-10 py-4 text-lg font-bold"
              >
                Paid Sensi
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#demo"
                className="inline-block rounded-full border border-purple-500/50 bg-black/40 px-8 py-4 text-lg font-semibold text-purple-100 transition hover:bg-purple-500/20"
              >
                Show Demo ↓
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-purple-400/70">
          <div style={{ animation: "float 2.4s ease-in-out infinite" }}>Scroll</div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative overflow-hidden border-y border-purple-500/20 bg-purple-950/20 py-5">
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-12 text-2xl font-black uppercase tracking-widest text-purple-200/80">
              {m}
              <span className="text-purple-500">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* DEMO */}
      <section id="demo" className="relative px-5 py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-800/20 blur-[130px]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-purple-400">Show Demo</p>
          <h2 className="mt-3 text-4xl font-black sm:text-6xl">
            Dekho <span className="text-gradient">result</span> apni aankhon se
          </h2>

          <div className="mt-12">
            <Tilt>
              <div className="rounded-3xl bg-gradient-to-br from-purple-500/60 via-purple-900/30 to-fuchsia-600/50 p-[2px] shadow-[0_0_90px_-10px_rgba(168,85,247,0.6)]">
                <div className="overflow-hidden rounded-[22px] bg-black">
                  <DemoVideo />
                </div>
              </div>
            </Tilt>
          </div>
        </div>
      </section>

      {/* DEVICES */}
      <section className="relative px-5 pb-28">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {[
            { t: "PC", d: "Stable X,Y tweaks, aim & FPS optimization, Windows tuning.", p: "₹799" },
            { t: "MOBILATOR", d: "No aimshake, perfect DPI, overclock without root.", p: "₹399" },
            { t: "MOBILE", d: "Brutal DPI, no recoil, full phone optimization.", p: "₹500" },
          ].map((c) => (
            <button
              key={c.t}
              data-hover
              onClick={() => setShowPricing(true)}
              className="glass group rounded-3xl p-8 text-left transition duration-300 hover:-translate-y-2 hover:border-purple-400/70 hover:shadow-[0_0_50px_-10px_rgba(168,85,247,0.7)]"
            >
              <div className="text-2xl font-black tracking-widest">{c.t}</div>
              <p className="mt-3 text-sm text-zinc-400">{c.d}</p>
              <div className="mt-6 flex items-center justify-between text-purple-300">
                <span>Sensi from {c.p}</span>
                <span className="transition group-hover:translate-x-2">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-5 pb-28 text-center">
        <h2 className="text-4xl font-black sm:text-6xl">
          Ready to <span className="text-gradient">dominate?</span>
        </h2>
        <div className="mt-8">
          <Magnetic>
            <button
              onClick={() => setShowPricing(true)}
              className="btn-glow rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-12 py-5 text-xl font-bold"
            >
              Paid Sensi
            </button>
          </Magnetic>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-purple-500/20 px-5 py-8 text-center">
        <p className="text-sm tracking-widest text-zinc-400">
          Developed By <span className="font-bold text-purple-300">Dexter</span>
        </p>
      </footer>

      {showPricing && <Pricing onClose={() => setShowPricing(false)} />}
      {showAbout && <About onClose={() => setShowAbout(false)} />}
    </div>
  );
}
