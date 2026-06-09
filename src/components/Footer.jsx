export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-12">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <span className="text-white/40 text-sm">F1 Atlas</span>
        <a
          href="https://jolpi.ca"
          target="_blank"
          rel="noreferrer"
          className="text-white/40 hover:text-white/70 text-sm transition-colors">
          Data by Jolpica
        </a>
      </div>
    </footer>
  );
}