import { useState } from "react";
import SeasonContext from "./SeasonContext";

function SeasonProvider({ children }) {
  const [season, setSeason] = useState("current");

  return (
    <SeasonContext.Provider value={{ season, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
}

export default SeasonProvider;