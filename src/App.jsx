import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RaceDetail from "./pages/RaceDetail";
import Standings from "./pages/Standings";
import DriverDetail from "./pages/DriverDetail";
import Circuits from "./pages/Circuits";
import CircuitDetail from "./pages/CircuitDetail";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/race/:season/:round" element={<RaceDetail />} />
          <Route path="/standings" element={<Standings />} />
          <Route path="/driver/:season/:driverId" element={<DriverDetail />} />
          <Route path="/circuits" element={<Circuits />} />
          <Route path="/circuits/:circuitId" element={<CircuitDetail />} />
          <Route
            path="*"
            element={<ErrorMessage message="Page not found." isError={false} />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
