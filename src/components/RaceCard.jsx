import { Link } from "react-router";
import { getFlagUrl } from "../utils/countryMap";
import { getDriverImageUrl } from "../utils/driverImages";
import { getCircuitPath } from "../utils/circuitPaths";

const MEDAL_COLORS = ["text-[#FFD700]", "text-[#C0C0C0]", "text-[#CD7F32]"];
const MEDAL_BG = ["bg-[#FFD700]/15", "bg-[#C0C0C0]/15", "bg-[#CD7F32]/15"];
const MEDAL_BORDER = [
  "border-[#FFD700]/30",
  "border-[#C0C0C0]/30",
  "border-[#CD7F32]/30",
];

const CARD_BASE =
  "flex flex-col bg-[#12121a] border border-white/10 rounded-lg p-5 min-h-[250px] hover:border-white/25 transition-colors";

function formatDateRange(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const endDay = (date.getDate() + 2).toString().padStart(2, "0");
  const month = date
    .toLocaleDateString("en-GB", { month: "short" })
    .toUpperCase();
  return `${day} - ${endDay} ${month}`;
}

export default function RaceCard({ race, variant, podium }) {
  const country = race.Circuit.Location.country;
  const flagUrl = getFlagUrl(country, 80);
  const season = race.season;
  const round = race.round;
  const circuitPath = getCircuitPath(race.Circuit.circuitId);

  if (variant === "completed") {
    return (
      <Link to={`/race/${season}/${round}`} className={CARD_BASE}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#8b95a5]">
            ROUND {round}
          </span>
          <span className="flex items-center gap-1.5 bg-white/8 rounded-full px-3 py-1 text-[11px] font-medium tracking-wider text-white">
            🏁 {formatDateRange(race.date)}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-1">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={country}
              className="w-7 h-5 rounded-sm object-cover"
            />
          )}
          <span className="text-2xl font-bold text-white">{country}</span>
        </div>

        <p className="text-[11px] text-white/50 tracking-[0.1em] uppercase">
          {race.raceName}
        </p>

        <div className="flex-1" />

        {podium && podium.length >= 3 && (
          <div className="flex items-stretch gap-2 mt-4">
            {podium.map((driver, i) => {
              const imgUrl = getDriverImageUrl(driver.code);
              return (
                <div
                  key={driver.code}
                  className={`flex flex-col items-center gap-1 ${MEDAL_BG[i]} border ${MEDAL_BORDER[i]} rounded-lg px-2 py-2 flex-1 min-w-0`}
                >
                  <div className="flex items-center gap-1.5 w-full h-6">
                    <span
                      className={`${MEDAL_COLORS[i]} text-[11px] font-black shrink-0`}
                    >
                      {i + 1}
                    </span>
                    {imgUrl && (
                      <img
                        src={imgUrl}
                        alt={driver.code}
                        className="w-6 h-6 rounded-full object-cover bg-white/10 shrink-0"
                      />
                    )}
                    <span className="text-[12px] font-bold text-white tracking-wide">
                      {driver.code}
                    </span>
                  </div>
                  {driver.time && (
                    <span className="text-[10px] text-[#8b95a5] tabular-nums w-full text-left truncate">
                      {driver.time}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Link>
    );
  }

  if (variant === "next") {
    return (
      <Link
        to={`/race/${season}/${round}`}
        className="relative flex flex-col bg-[#0c3d5f] border border-[#1a6a9a]/40 rounded-lg p-5 min-h-[250px] hover:border-[#1a6a9a]/70 transition-colors overflow-hidden"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-white/60">
            ROUND {round}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-1">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={country}
              className="w-8 h-5 rounded-sm object-cover"
            />
          )}
          <span className="text-3xl font-bold text-white">{country}</span>
        </div>

        <p className="text-[11px] text-white/50 tracking-[0.1em] uppercase">
          {race.raceName}
        </p>

        <div className="flex-1" />

        <span className="text-2xl font-bold text-white tracking-wide">
          {formatDateRange(race.date)}
        </span>

        {circuitPath && (
          <svg
            viewBox="0 0 500 500"
            className="absolute bottom-0 right-0 w-40 h-40 opacity-30"
          >
            <path
              d={circuitPath}
              fill="none"
              stroke="white"
              strokeWidth="14"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>
    );
  }

  if (variant === "upcoming") {
    return (
      <Link
        to={`/race/${season}/${round}`}
        className={`relative ${CARD_BASE} overflow-hidden`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#8b95a5]">
            ROUND {round}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-1">
          {flagUrl && (
            <img
              src={flagUrl}
              alt={country}
              className="w-7 h-5 rounded-sm object-cover"
            />
          )}
          <span className="text-2xl font-bold text-white">{country}</span>
        </div>

        <p className="text-[11px] text-white/50 tracking-[0.1em] uppercase">
          {race.raceName}
        </p>

        <div className="flex-1" />

        <span className="text-2xl font-bold text-white tracking-wide">
          {formatDateRange(race.date)}
        </span>

        {circuitPath && (
          <svg
            viewBox="0 0 500 500"
            className="absolute bottom-0 right-0 w-36 h-36 opacity-30"
          >
            <path
              d={circuitPath}
              fill="none"
              stroke="white"
              strokeWidth="14"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>
    );
  }

  return null;
}
