import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Standings() {
  const [activeTab, setActiveTab] = useState("drivers");

  const {
    data: driversData,
    loading: driversLoading,
    error: driversError,
  } = useFetch("current/driverstandings.json");
  const {
    data: constructorsData,
    loading: constructorsLoading,
    error: constructorsError,
  } = useFetch("current/constructorstandings.json");

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
      color: activeTab === "drivers" ? "white" : "var(--color-gray-400)"
    }}
  >
    Drivers
  </span>
  <span
    onClick={() => setActiveTab("constructors")}
    className="pb-3 text-sm font-medium cursor-pointer transition-colors border-b-2"
    style={{
      borderColor: activeTab === "constructors" ? "white" : "transparent",
      color: activeTab === "constructors" ? "white" : "var(--color-gray-400)"
    }}
  >
    Constructors
  </span>
</div>
    </main>
  );
}
