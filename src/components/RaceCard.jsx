import { Link } from "react-router";

export default function RaceCard({ race }) {
  const isCompleted = new Date(race.date) < new Date();

  return (
    <Link to={`/race/current/${race.round}`}>
      <div className={`p-4 border rounded-lg transition-colors ${
        isCompleted
          ? "border-white/10 hover:border-white/30"
          : "border-f1-red/40 hover:border-f1-red"
      }`}>
        <span className="text-xs text-white/40 uppercase tracking-wider">
          Round {race.round}
        </span>
        <h3 className="text-white font-bold mt-1">{race.raceName}</h3>
        <p className="text-white/50 text-sm mt-2">{race.Circuit.circuitName}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-white/40 text-xs">{race.Circuit.Location.country}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            isCompleted
              ? "bg-white/10 text-white/40"
              : "bg-f1-red/20 text-f1-red"
          }`}>
            {isCompleted ? "Completed" : race.date}
          </span>
        </div>
      </div>
    </Link>
  );
}