import useFetch from "../hooks/useFetch";
import useSeason from "../hooks/useSeason.js";
import RaceCard from "../components/RaceCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { season } = useSeason();
  const { data, loading, error } = useFetch(`${season}.json`);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-white text-2xl font-bold mb-6">
        {season === "current" ? "Current" : season} Season
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.RaceTable.Races.map((race) => (
          <RaceCard key={race.round} race={race} season={season} />
        ))}
      </div>
    </main>
  );
}