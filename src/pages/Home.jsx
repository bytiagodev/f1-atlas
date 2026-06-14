import { useState, useEffect } from "react";
import useSeason from "../hooks/useSeason";
import { fetchF1 } from "../utils/api";
import RaceCard from "../components/RaceCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { season } = useSeason();
  const [races, setRaces] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loadedSeason, setLoadedSeason] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const scheduleData = await fetchF1(`${season}.json`);

        let allRaces = [];
        let offset = 0;
        let total = Infinity;

        while (offset < total) {
          const page = await fetchF1(
            `${season}/results.json?limit=100&offset=${offset}`,
          );
          total = parseInt(page.total);

          for (const race of page.RaceTable.Races) {
            const existing = allRaces.find((r) => r.round === race.round);
            if (existing) {
              existing.Results.push(...race.Results);
            } else {
              allRaces.push(race);
            }
          }

          offset += 100;
        }

        if (!cancelled) {
          setRaces(scheduleData.RaceTable.Races);
          setResults(allRaces);
          setError(null);
          setLoadedSeason(season);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoadedSeason(season);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [season]);

  const loading = loadedSeason !== season;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const completed = [];
  let next = null;
  const upcoming = [];

  for (const race of races) {
    const raceDate = new Date(race.date);
    if (raceDate < today) {
      completed.push(race);
    } else if (!next) {
      next = race;
    } else {
      upcoming.push(race);
    }
  }

  function getPodium(round) {
    const race = results.find((r) => r.round === round);
    if (!race || !race.Results) return null;
    return race.Results.slice(0, 3).map((r) => ({
      code: r.Driver.code,
      Constructor: r.Constructor,
      time: r.Time?.time || null,
    }));
  }

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (races.length === 0) return <ErrorMessage message="No races found for this season." isError={false} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {completed.length > 0 && (
        <section className="mb-10">
          <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8b95a5] mb-4">
            COMPLETED
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {completed.map((race) => (
              <RaceCard
                key={race.round}
                race={race}
                variant="completed"
                podium={getPodium(race.round)}
              />
            ))}
          </div>
        </section>
      )}

      {(next || upcoming.length > 0) && (
        <section>
          <h2 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8b95a5] mb-4">
            UPCOMING
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {next && <RaceCard key={next.round} race={next} variant="next" />}
            {upcoming.map((race) => (
              <RaceCard key={race.round} race={race} variant="upcoming" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
