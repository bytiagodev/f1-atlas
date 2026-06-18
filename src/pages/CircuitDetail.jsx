import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { fetchF1 } from "../utils/api";
import { getFlagUrl } from "../utils/countryMap";
import { getCircuitPath } from "../utils/circuitPaths";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function CircuitDetail() {
  const { circuitId } = useParams();
  const [circuit, setCircuit] = useState(null);
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCircuit() {
      try {
        let allRaces = [];
        let offset = 0;
        let total = Infinity;

        while (offset < total) {
          const data = await fetchF1(
            `circuits/${circuitId}/results/1.json?limit=100&offset=${offset}`,
          );
          total = parseInt(data.total);
          allRaces = allRaces.concat(data.RaceTable.Races);
          offset += 100;
        }

        if (allRaces.length === 0) {
          setError("No race results found for this circuit.");
          return;
        }

        setCircuit(allRaces[0].Circuit);
        setRaces(allRaces);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCircuit();
  }, [circuitId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const circuitPath = getCircuitPath(circuitId);
  const flagUrl = getFlagUrl(circuit.Location.country, 80);

  const seasons = races.map((r) => parseInt(r.season));
  const debutYear = Math.min(...seasons);
  const latestYear = Math.max(...seasons);

  const winnerCounts = {};
  for (const race of races) {
    const driver = race.Results[0].Driver;
    const id = driver.driverId;
    if (!winnerCounts[id]) {
      winnerCounts[id] = {
        name: `${driver.givenName} ${driver.familyName}`,
        driverId: id,
        count: 0,
      };
    }
    winnerCounts[id].count++;
  }

  const uniqueWinners = Object.keys(winnerCounts).length;
  const topWinner = Object.values(winnerCounts).sort(
    (a, b) => b.count - a.count,
  )[0];

  const sortedRaces = [...races].sort(
    (a, b) => parseInt(b.season) - parseInt(a.season),
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link
          to="/circuits"
          className="text-xs tracking-widest uppercase text-[#8b95a5] hover:text-white transition-colors"
        >
          Circuits
        </Link>
        <span className="text-[#8b95a5] mx-2">/</span>
        <span className="text-xs tracking-widest uppercase text-white">
          {circuit.circuitName}
        </span>
      </nav>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
        {circuitPath && (
          <div className="w-32 h-32 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full opacity-40">
              <path
                d={circuitPath}
                fill="none"
                stroke="white"
                strokeWidth="14"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-wider uppercase">
            {circuit.circuitName}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            {flagUrl && (
              <img
                src={flagUrl}
                alt={circuit.Location.country}
                className="w-6 h-4 rounded-sm object-cover"
              />
            )}
            <p className="text-[#8b95a5]">
              {circuit.Location.locality}, {circuit.Location.country}
            </p>
          </div>
          <p className="text-[#8b95a5] text-sm mt-1">
            First race {debutYear}
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.08] pt-6">
        <h2 className="text-sm font-bold tracking-widest uppercase text-white mb-6">
          Race Winners
        </h2>

        <div className="flex flex-wrap items-baseline gap-6 sm:gap-8 mb-8">
          <div>
            <p className="text-2xl font-bold">{races.length}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Races
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/[0.08] self-center" />
          <div>
            <p className="text-2xl font-bold">
              {debutYear}–{latestYear}
            </p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Years
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/[0.08] self-center" />
          <div>
            <p className="text-2xl font-bold">{uniqueWinners}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Different Winners
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/[0.08] self-center" />
          <div>
            <p className="text-2xl font-bold">{topWinner.name}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Most Successful Driver
            </p>
            <p className="text-[#8b95a5] text-[11px] mt-0.5">
              {topWinner.count} {topWinner.count === 1 ? "win" : "wins"}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#8b95a5] text-xs tracking-widest uppercase border-b border-white/[0.08]">
                <th className="pb-3 pr-4 font-medium">Season</th>
                <th className="pb-3 pr-4 font-medium">Race</th>
                <th className="pb-3 pr-4 font-medium">Winner</th>
                <th className="pb-3 font-medium">Constructor</th>
              </tr>
            </thead>
            <tbody>
              {sortedRaces.map((race) => {
                const result = race.Results[0];
                const driver = result.Driver;
                return (
                  <tr
                    key={race.season}
                    className="border-b border-white/[0.04]"
                  >
                    <td className="py-2.5 pr-4 text-white/50 tabular-nums">
                      {race.season}
                    </td>
                    <td className="py-2.5 pr-4 text-white/50">
                      <Link
                        to={`/race/${race.season}/${race.round}`}
                        className="hover:text-white transition-colors"
                      >
                        {race.raceName}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 font-medium">
                      <Link
                        to={`/driver/${race.season}/${driver.driverId}`}
                        className="hover:text-white/70 transition-colors"
                      >
                        {driver.givenName} {driver.familyName}
                      </Link>
                    </td>
                    <td className="py-2.5 text-white/50">
                      {result.Constructor.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
