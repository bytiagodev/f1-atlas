import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { formatDate } from "../utils/formatters";

function formatStatus(result, winnerLaps) {
  if (result.status === "Lapped") {
    const diff = winnerLaps - parseInt(result.laps);
    return diff === 1 ? "+1 LAP" : `+${diff} LAPS`;
  }
  if (result.Time?.time) return result.Time.time;
  const map = { Retired: "DNF", "Did not start": "DNS", Disqualified: "DSQ" };
  return map[result.status] ?? result.status;
}

export default function RaceDetail() {
  const { season, round } = useParams();
  const resultsEndpoint = `${season}/${round}/results.json`;
  const qualifyingEndpoint = `${season}/${round}/qualifying.json`;

  const {
    data: resultsData,
    loading: resultsLoading,
    error: resultsError,
  } = useFetch(resultsEndpoint);
  const {
    data: qualifyingData,
    loading: qualifyingLoading,
    error: qualifyingError,
  } = useFetch(qualifyingEndpoint);
  const { data: raceData } = useFetch(`${season}/${round}.json`);

  if (resultsLoading || qualifyingLoading) return <Loader />;
  if (resultsError) return <ErrorMessage message={resultsError} />;
  if (qualifyingError) return <ErrorMessage message={qualifyingError} />;

  const race = resultsData?.RaceTable?.Races?.[0];
  const results = race?.Results ?? [];
  const winnerLaps = parseInt(results[0]?.laps ?? 0);
  const qualifying =
    qualifyingData?.RaceTable?.Races?.[0]?.QualifyingResults ?? [];

if (!race) {
  const raceDate = raceData?.RaceTable?.Races?.[0]?.date;
  if (raceDate && new Date(raceDate) > new Date()) {
    return <ErrorMessage message="This race hasn't happened yet." isError={false} />;
  }
  return <ErrorMessage message="Race data not found." />;
}

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-1">Round {race.round}</p>
        <h1 className="text-3xl font-bold mb-1">{race.raceName}</h1>
        <p className="text-gray-400">
          {race.Circuit.circuitName} &middot; {formatDate(race.date)}
        </p>
      </div>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Race Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-2 pr-4">Pos</th>
                <th className="pb-2 pr-4">Driver</th>
                <th className="pb-2 pr-4">Constructor</th>
                <th className="pb-2 pr-4">Time</th>
                <th className="pb-2 text-right">Pts</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.position} className="border-b border-gray-800">
                  <td className="py-2 pr-4">{result.position}</td>
                  <td className="py-2 pr-4">
                    {result.Driver.givenName} {result.Driver.familyName}
                  </td>
                  <td className="py-2 pr-4">{result.Constructor.name}</td>
                  <td className="py-2 pr-4">{formatStatus(result)}</td>
                  <td className="py-2">{result.points}</td>
                  <td className="py-2 pr-4">{formatStatus(result, winnerLaps)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Qualifying</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-700">
                <th className="pb-2 pr-4">Pos</th>
                <th className="pb-2 pr-4">Driver</th>
                <th className="pb-2 pr-4">Q1</th>
                <th className="pb-2 pr-4">Q2</th>
                <th className="pb-2">Q3</th>
              </tr>
            </thead>
            <tbody>
              {qualifying.map((result) => (
                <tr key={result.position} className="border-b border-gray-800">
                  <td className="py-2 pr-4">{result.position}</td>
                  <td className="py-2 pr-4">
                    {result.Driver.givenName} {result.Driver.familyName}
                  </td>
                  <td className="py-2 pr-4">{result.Q1 ?? "-"}</td>
                  <td className="py-2 pr-4">{result.Q2 ?? "-"}</td>
                  <td className="py-2">{result.Q3 ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
