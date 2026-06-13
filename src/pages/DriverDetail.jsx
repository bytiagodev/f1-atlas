import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { fetchF1 } from "../utils/api.js";
import Loader from "../components/Loader.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { formatDate } from "../utils/formatters.js";

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
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
  to="/standings"
  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
>
  <span className="text-lg leading-none">&larr;</span>
  <span>Back to Standings</span>
</Link>

      <div className="flex gap-6 items-start mb-8">
        {photo ? (
          <img
            src={photo}
            alt={`${driver.givenName} ${driver.familyName}`}
            className="w-32 h-32 object-cover rounded-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-lg bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
            No photo
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold">
            {driver.givenName} {driver.familyName}
          </h1>
          <p className="text-gray-400 mt-1">
            #{driver.permanentNumber} · {driver.nationality}
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Born {formatDate(driver.dateOfBirth)}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{totalPoints}</p>
          <p className="text-gray-400 text-sm mt-1">Points</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{wins}</p>
          <p className="text-gray-400 text-sm mt-1">Wins</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{podiums}</p>
          <p className="text-gray-400 text-sm mt-1">Podiums</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <p className="text-2xl font-bold">{bestFinish}</p>
          <p className="text-gray-400 text-sm mt-1">Best Finish</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-4">{season === "current" ? "Current" : season} Season Results</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-400 border-b border-gray-700">
              <th className="text-left py-2 pr-4">Round</th>
              <th className="text-left py-2 pr-4">Race</th>
              <th className="text-right py-2 pr-4">Grid</th>
              <th className="text-right py-2 pr-4">Finish</th>
              <th className="text-right py-2 pr-4">Points</th>
              <th className="text-right py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {races.map((race) => {
              const result = race.Results[0];
              return (
                <tr
                  key={race.round}
                  className="border-b border-gray-800 hover:bg-gray-800"
                >
                  <td className="py-2 pr-4">{race.round}</td>
                  <td className="py-2 pr-4">{race.raceName}</td>
                  <td className="text-right py-2 pr-4">{result.grid}</td>
                  <td className="text-right py-2 pr-4">{result.position}</td>
                  <td className="text-right py-2 pr-4">{result.points}</td>
                  <td className="text-right py-2">{result.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
