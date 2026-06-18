import { Link, useLocation } from "react-router";
import SeasonSelector from "./SeasonSelector";

export default function Header() {
  const { pathname } = useLocation();

  const navLink = (to, label, isActive) => (
    <Link
      to={to}
      className={`text-[11px] tracking-[0.08em] sm:tracking-[0.15em] uppercase pb-1 transition-colors ${
        isActive
          ? "text-white border-b border-f1-red"
          : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-f1-dark border-b border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex flex-col gap-1">
          <span className="text-white text-sm font-medium tracking-[0.25em]">
            F1 ATLAS
          </span>
          <span className="w-5 h-0.5 bg-f1-red" />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-7">
          {navLink("/", "Calendar", pathname === "/")}
          {navLink("/standings", "Standings", pathname === "/standings")}
          {navLink(
            "/circuits",
            "Circuits",
            pathname.startsWith("/circuits"),
          )}
          <SeasonSelector />
        </nav>
      </div>
    </header>
  );
}
