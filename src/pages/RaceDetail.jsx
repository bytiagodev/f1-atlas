import { useParams, Link } from "react-router";
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

  const race = resultsData?.RaceTable?.Races?.[0];
  const results = race?.Results ?? [];
  const winnerLaps = parseInt(results[0]?.laps ?? 0);
  const qualifying =
    qualifyingData?.RaceTable?.Races?.[0]?.QualifyingResults ?? [];

  if (!race) {
    const raceDate = raceData?.RaceTable?.Races?.[0]?.date;
    if (raceDate && new Date(raceDate) > new Date()) {
      return (
        <ErrorMessage
          message="This race hasn't happened yet."
          isError={false}
        />
      );
    }
    return <ErrorMessage message="Race data not found." />;
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <Link
          to="/"
          className="text-xs tracking-widest uppercase text-[#8b95a5] hover:text-white transition-colors"
        >
          Calendar
        </Link>
        <span className="text-[#8b95a5] mx-2">/</span>
        <span className="text-xs tracking-widest uppercase text-white">
          Round {race.round}
        </span>
      </nav>

      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-wider uppercase mb-1">
          {race.raceName}
        </h1>
        <p className="text-[#8b95a5]">
          {race.Circuit.circuitName} &middot; {formatDate(race.date)}
        </p>
      </div>

      <section className="mb-12">
        <h2 className="text-xs font-medium tracking-widest uppercase text-[#8b95a5] mb-4">
          Race Results
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#8b95a5] text-xs tracking-widest uppercase border-b border-white/[0.08]">
                <th className="pb-3 pr-4 font-medium">Position</th>
                <th className="pb-3 pr-4 font-medium">Driver</th>
                <th className="pb-3 pr-4 font-medium">Constructor</th>
                <th className="pb-3 pr-4 font-medium">Time / Status</th>
                <th className="pb-3 font-medium text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result.position}
                  className="border-b border-white/[0.04]"
                >
                  <td className="py-2.5 pr-4 text-white/50">
                    {result.position}
                  </td>
                  <td className="py-2.5 pr-4 font-medium">
                    <Link
                      to={`/driver/${season}/${result.Driver.driverId}`}
                      className="hover:text-white/70 transition-colors"
                    >
                      {result.Driver.givenName} {result.Driver.familyName}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 text-white/45">
                    {result.Constructor.name}
                  </td>
                  <td className="py-2.5 pr-4 text-white/50">
                    {formatStatus(result, winnerLaps)}
                  </td>
                  <td className="py-2.5 text-right font-medium">
                    {result.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xs font-medium tracking-widest uppercase text-[#8b95a5] mb-4">
          Qualifying
        </h2>
        {qualifying.length === 0 ? (
          <ErrorMessage message="No qualifying data available for this race." isError={false} />
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#8b95a5] text-xs tracking-widest uppercase border-b border-white/[0.08]">
                <th className="pb-3 pr-4 font-medium">Position</th>
                <th className="pb-3 pr-4 font-medium">Driver</th>
                <th className="pb-3 pr-4 font-medium">Q1</th>
                <th className="pb-3 pr-4 font-medium">Q2</th>
                <th className="pb-3 font-medium">Q3</th>
              </tr>
            </thead>
            <tbody>
              {qualifying.map((result) => (
                <tr
                  key={result.position}
                  className="border-b border-white/[0.04]"
                >
                  <td className="py-2.5 pr-4 text-white/50">
                    {result.position}
                  </td>
                  <td className="py-2.5 pr-4 font-medium">
                    <Link
                      to={`/driver/${season}/${result.Driver.driverId}`}
                      className="hover:text-white/70 transition-colors"
                    >
                      {result.Driver.givenName} {result.Driver.familyName}
                    </Link>
                  </td>
                  <td className="py-2.5 pr-4 text-white/50">
                    {result.Q1 ?? "-"}
                  </td>
                  <td className="py-2.5 pr-4 text-white/50">
                    {result.Q2 ?? "-"}
                  </td>
                  <td className="py-2.5 text-white/50">
                    {result.Q3 ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>
    </main>
  );
}