import { Link } from "react-router";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-f1-dark border-b border-white/10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-white font-bold tracking-wide">
          F1 Atlas
        </Link>
        <nav className="flex gap-6">
          <Link
            to="/"
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            Calendar
          </Link>
          <Link
            to="/standings"
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            Standings
          </Link>
        </nav>
      </div>
    </header>
  );
}
