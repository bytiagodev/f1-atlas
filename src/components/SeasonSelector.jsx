import { useState, useEffect, useRef } from "react";
import { fetchF1 } from "../utils/api.js";
import useSeason from "../hooks/useSeason.js";

export default function SeasonSelector() {
  const [seasons, setSeasons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { season, setSeason } = useSeason();
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function loadSeasons() {
      try {
        const data = await fetchF1("seasons.json?limit=100");
        const list = data.SeasonTable.Seasons.map((s) => s.season).reverse();
        setSeasons(list);
      } catch (err) {
        console.error("Failed to load seasons:", err);
      }
    }
    loadSeasons();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(value) {
    setSeason(value);
    setIsOpen(false);
  }

  const displayValue = season === "current" ? "CURRENT" : season;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/50 text-[11px] tracking-[0.1em] border border-white/[0.12] px-2.5 py-1 hover:text-white hover:border-white/25 transition-colors cursor-pointer"
      >
        <span>{displayValue}</span>
        <span
          className={`text-[8px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 bg-f1-surface border border-white/[0.08] max-h-64 overflow-y-auto custom-scrollbar z-50 min-w-[100px]">
          <button
            onClick={() => handleSelect("current")}
            className={`block w-full text-left px-3 py-1.5 text-[11px] tracking-[0.1em] transition-colors cursor-pointer ${
              season === "current"
                ? "text-white bg-white/[0.06]"
                : "text-white/50 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            CURRENT
          </button>
          {seasons.map((s) => (
            <button
              key={s}
              onClick={() => handleSelect(s)}
              className={`block w-full text-left px-3 py-1.5 text-[11px] tracking-[0.08em] transition-colors cursor-pointer ${
                season === s
                  ? "text-white bg-white/[0.06]"
                  : "text-white/50 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}