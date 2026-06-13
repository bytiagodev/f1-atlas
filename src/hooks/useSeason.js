import { useContext } from "react";
import SeasonContext from "../context/SeasonContext";

function useSeason() {
  const context = useContext(SeasonContext);

  if (!context) {
    throw new Error("useSeason must be used within a SeasonProvider");
  }

  return context;
}

export default useSeason;