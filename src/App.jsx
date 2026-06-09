import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/race/:season/:round" element={<h2>Race Detail coming in Phase 2</h2>} />
          <Route path="/standings" element={<h2>Standings coming in Phase 2</h2>} />
          <Route path="*" element={<h2>404 — Page not found</h2>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;