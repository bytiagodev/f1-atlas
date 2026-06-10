import { useParams } from "react-router";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

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

  if (resultsLoading || qualifyingLoading) return <Loader />;
  if (resultsError) return <ErrorMessage message={resultsError} />;
  if (qualifyingError) return <ErrorMessage message={qualifyingError} />;

  const race = resultsData?.RaceTable?.Races?.[0];
  const results = race?.Results ?? [];
  const qualifying =
    qualifyingData?.RaceTable?.Races?.[0]?.QualifyingResults ?? [];

  if (!race) return <ErrorMessage message="Race data not found." />;

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-1">Round {race.round}</p>
        <h1 className="text-3xl font-bold mb-1">{race.raceName}</h1>
        <p className="text-gray-400">
          {race.Circuit.circuitName} &middot; {race.date}
        </p>
      </div>
    </main>
  );
}
