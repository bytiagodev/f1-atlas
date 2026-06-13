import { useState, useEffect } from "react";
import { fetchF1 } from "../utils/api.js";
import useSeason from "../hooks/useSeason.js";

export default function SeasonSelector() {
  const [seasons, setSeasons] = useState([]);
  const { season, setSeason } = useSeason();

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

  return (
    <select
      value={season}
      onChange={(e) => setSeason(e.target.value)}
      className="bg-f1-dark text-white text-sm border border-white/20 rounded px-2 py-1"
    >
      <option value="current">Current</option>
      {seasons.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
