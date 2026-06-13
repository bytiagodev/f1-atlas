import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useSeason from "../hooks/useSeason.js";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import StandingsRow from "../components/StandingsRow";

export default function Standings() {
  const [activeTab, setActiveTab] = useState("drivers");
  const { season } = useSeason();

  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
  } = useFetch(`${season}/driverstandings.json`);
  const {
    data: constructorsData,
    loading: constructorsLoading,
    error: constructorsError,
  } = useFetch(`${season}/constructorstandings.json`);

  if (driversLoading || constructorsLoading) return <Loader />;
  if (driversError) return <ErrorMessage message={driversError} />;
  if (constructorsError) return <ErrorMessage message={constructorsError} />;

  const driverStandings =
    driversData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
  const constructorStandings =
    constructorsData?.StandingsTable?.StandingsLists?.[0]
      ?.ConstructorStandings ?? [];

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Standings</h1>

      <div className="flex gap-6 mb-8">
        <span
          onClick={() => setActiveTab("drivers")}
          className="pb-3 text-sm font-medium cursor-pointer transition-colors border-b-2"
          style={{
            borderColor: activeTab === "drivers" ? "white" : "transparent",
            color: activeTab === "drivers" ? "white" : "var(--color-gray-400)",
          }}
        >
          Drivers
        </span>
        <span
          onClick={() => setActiveTab("constructors")}
          className="pb-3 text-sm font-medium cursor-pointer transition-colors border-b-2"
          style={{
            borderColor: activeTab === "constructors" ? "white" : "transparent",
            color:
              activeTab === "constructors" ? "white" : "var(--color-gray-400)",
          }}
        >
          Constructors
        </span>
      </div>
      {activeTab === "drivers" && (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-2 pr-4">Pos</th>
              <th className="pb-2 pr-4">Driver</th>
              <th className="pb-2 pr-4">Nationality</th>
              <th className="pb-2 pr-4">Constructor</th>
              <th className="pb-2 pr-4 text-right">Wins</th>
              <th className="pb-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {driverStandings.map((standing) => (
              <StandingsRow
                key={standing.position}
                position={standing.position}
                name={`${standing.Driver.givenName} ${standing.Driver.familyName}`}
                nationality={standing.Driver.nationality}
                extra={standing.Constructors[0].name}
                wins={standing.wins}
                points={standing.points}
                link={`/driver/${season}/${standing.Driver.driverId}`}
              />
            ))}
          </tbody>
        </table>
      )}
      {activeTab === "constructors" && (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-2 pr-4">Pos</th>
              <th className="pb-2 pr-4">Constructor</th>
              <th className="pb-2 pr-4">Nationality</th>
              <th className="pb-2 pr-4 text-right">Wins</th>
              <th className="pb-2 text-right">Pts</th>
            </tr>
          </thead>
          <tbody>
            {constructorStandings.map((standing) => (
              <StandingsRow
                key={standing.position}
                position={standing.position}
                name={standing.Constructor.name}
                nationality={standing.Constructor.nationality}
                extra={null}
                wins={standing.wins}
                points={standing.points}
              />
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
