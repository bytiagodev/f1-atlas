export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] mt-12">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-col gap-1 mb-2">
              <span className="text-white text-xs font-medium tracking-[0.25em]">
                F1 ATLAS
              </span>
              <span className="w-5 h-0.5 bg-f1-red" />
            </div>
            <p className="text-[#8b95a5] text-[10px] tracking-[0.12em] uppercase">
              Every season. Every race. Every driver.
            </p>
          </div>
          <div className="flex gap-6 text-[10px] tracking-[0.08em] uppercase">
            <a
              href="https://github.com/bytiagodev/f1-atlas"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/70 transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://bytiago.com"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/70 transition-colors"
            >
              bytiago.com
            </a>
            <a
              href="https://jolpi.ca"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/70 transition-colors"
            >
              Jolpica API
            </a>
          </div>
        </div>
        <p className="text-white/30 text-[9px] tracking-[0.05em]">
          This project is unofficial and is not associated with Formula One companies. F1, Formula 1, FIA Formula One World Championship, Grand Prix, and related marks are trademarks of Formula One Licensing BV.
        </p>
      </div>
    </footer>
  );
}