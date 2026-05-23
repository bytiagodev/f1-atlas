import { Routes, Route } from "react-router";

function App() {
  return (
    <div>
      <header>F1 Atlas</header>

      <main>
        <Routes>
          <Route path="/" element={<h2>Home coming soon</h2>} />
          <Route path="/race/:season/:round" element={<h2>Race Detail coming in Phase 2</h2>} />
          <Route path="/standings" element={<h2>Standings coming in Phase 2</h2>} />
          <Route path="*" element={<h2>404 — Page not found</h2>} />
        </Routes>
      </main>

      <footer>F1 Atlas © 2026</footer>
    </div>
  );
}

export default App;