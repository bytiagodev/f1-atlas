import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import RaceDetail from "./pages/RaceDetail";
import Standings from "./pages/Standings";

function App() {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/race/:season/:round" element={<RaceDetail />} />
          <Route path="/standings" element={<Standings />} />
          <Route
            path="/driver/:season/:driverId"
            element={<p className="p-8">Driver Detail coming in Phase 3</p>}
          />
          <Route path="*" element={<h2>404 — Page not found</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
