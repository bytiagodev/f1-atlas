import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { fetchF1 } from "../utils/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { formatDate } from "../utils/formatters";

export default function DriverDetail() {
  const { season, driverId } = useParams();
  const [driver, setDriver] = useState(null);
  const [races, setRaces] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDriver() {
      try {
        const data = await fetchF1(
          `${season}/drivers/${driverId}/results.json`,
        );
        const raceList = data.RaceTable.Races;

        if (!raceList || raceList.length === 0) {
          setError("No results found for this driver.");
          return;
        }

        const driverInfo = raceList[0].Results[0].Driver;

        setDriver(driverInfo);
        setRaces(raceList);

        const pageTitle = driverInfo.url.split("/").at(-1);
        const wikiRes = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${pageTitle}`,
        );
        const wikiData = await wikiRes.json();
        setPhoto(wikiData.thumbnail?.source ?? null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDriver();
  }, [season, driverId]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const wins = races.filter((r) => r.Results[0].position === "1").length;
  const podiums = races.filter(
    (r) => Number(r.Results[0].position) <= 3,
  ).length;
  const bestFinish = Math.min(
    ...races.map((r) => Number(r.Results[0].position)),
  );
  const totalPoints = races.reduce(
    (sum, r) => sum + Number(r.Results[0].points),
    0,
  );
  const seasonNum = parseInt(season);
  const isPre2014 = !isNaN(seasonNum) && seasonNum < 2014;
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link
          to="/standings"
          className="text-xs tracking-widest uppercase text-[#8b95a5] hover:text-white transition-colors"
        >
          Standings
        </Link>
        <span className="text-[#8b95a5] mx-2">/</span>
        <span className="text-xs tracking-widest uppercase text-white">
          {driver.givenName} {driver.familyName}
        </span>
      </nav>

      <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
        {photo && (
          <img
            src={photo}
            alt={`${driver.givenName} ${driver.familyName}`}
            className="w-32 h-32 object-cover rounded-lg"
          />
        )}

        <div>
          <h1 className="text-2xl font-bold tracking-wider uppercase">
            {driver.givenName} {driver.familyName}
          </h1>
          <p className="text-[#8b95a5] mt-1">
            {driverId === "michael_schumacher" && isPre2014 ? (
              <span className="text-f1-red font-bold">#1</span>
            ) : !isPre2014 && driver.permanentNumber ? (
              <span>#{driver.permanentNumber}</span>
            ) : null}
            {((driverId === "michael_schumacher" && isPre2014) ||
              (!isPre2014 && driver.permanentNumber)) && (
              <span className="mx-1">&middot;</span>
            )}
            {driver.nationality}
          </p>
          <p className="text-[#8b95a5] text-sm mt-1">
            Born {formatDate(driver.dateOfBirth)}
          </p>
        </div>
      </div>
      <div className="border-t border-white/[0.08] pt-6">
        <h2 className="text-sm font-bold tracking-widest uppercase text-white mb-6">
          {season === "current" ? "" : `${season} `}Season Results
        </h2>

        <div className="flex flex-wrap items-baseline gap-6 sm:gap-8 mb-8">
          <div>
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Points
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/[0.08] self-center" />
          <div>
            <p className="text-2xl font-bold">{wins}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Wins
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/[0.08] self-center" />
          <div>
            <p className="text-2xl font-bold">{podiums}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Podiums
            </p>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/[0.08] self-center" />
          <div>
            <p className="text-2xl font-bold">P{bestFinish}</p>
            <p className="text-[#8b95a5] text-[11px] tracking-widest uppercase mt-0.5">
              Best Result
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#8b95a5] text-xs tracking-widest uppercase border-b border-white/[0.08]">
                <th className="pb-3 pr-4 font-medium">Round</th>
                <th className="pb-3 pr-4 font-medium">Race</th>
                <th className="pb-3 pr-4 font-medium text-right">Grid</th>
                <th className="pb-3 pr-4 font-medium text-right">Finish</th>
                <th className="pb-3 pr-4 font-medium text-right">Points</th>
                <th className="pb-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {races.map((race) => {
                const result = race.Results[0];
                return (
                  <tr key={race.round} className="border-b border-white/[0.04]">
                    <td className="py-2.5 pr-4 text-white/50">{race.round}</td>
                    <td className="py-2.5 pr-4 font-medium">
                      <Link
                        to={`/race/${season}/${race.round}`}
                        className="hover:text-white/70 transition-colors"
                      >
                        {race.raceName}
                      </Link>
                    </td>
                    <td className="py-2.5 pr-4 text-right text-white/50">
                      {result.grid}
                    </td>
                    <td className="py-2.5 pr-4 text-right text-white/50">
                      {result.position}
                    </td>
                    <td className="py-2.5 pr-4 text-right text-white/50">
                      {result.points}
                    </td>
                    <td className="py-2.5 text-right text-white/50">
                      {result.status}
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
