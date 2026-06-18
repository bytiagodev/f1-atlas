import { useState, useEffect } from "react";
import { Link } from "react-router";
import { fetchF1 } from "../utils/api";
import { getFlagUrl } from "../utils/countryMap";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const PER_PAGE = 10;

export default function Circuits() {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function loadCircuits() {
      try {
        let all = [];
        let offset = 0;
        let total = Infinity;

        while (offset < total) {
          const data = await fetchF1(
            `circuits.json?limit=100&offset=${offset}`,
          );
          total = parseInt(data.total);
          all = all.concat(data.CircuitTable.Circuits);
          offset += 100;
        }

        all.sort((a, b) =>
          a.Location.country.localeCompare(b.Location.country),
        );
        setCircuits(all);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadCircuits();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [search]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  const query = search.toLowerCase().trim();
  const filtered = query
    ? circuits.filter(
        (c) =>
          c.circuitName.toLowerCase().includes(query) ||
          c.Location.locality.toLowerCase().includes(query) ||
          c.Location.country.toLowerCase().includes(query),
      )
    : circuits;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const start = page * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold tracking-wider uppercase mb-8">
        Circuits
      </h1>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, city or country"
          className="w-full max-w-sm bg-transparent border border-white/[0.12] px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors tracking-wide"
        />
      </div>

      {filtered.length === 0 ? (
        <ErrorMessage
          message="No circuits match your search."
          isError={false}
        />
      ) : (
        <>
          <div className="border-t border-white/[0.08]">
            {visible.map((circuit) => {
              const flagUrl = getFlagUrl(circuit.Location.country, 40);

              return (
                <Link
                  key={circuit.circuitId}
                  to={`/circuits/${circuit.circuitId}`}
                  className="flex items-center justify-between gap-4 py-4 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors px-1 -mx-1 group"
                >
                  <div className="flex items-center gap-3 shrink-0">
                    {flagUrl ? (
                      <img
                        src={flagUrl}
                        alt={circuit.Location.country}
                        className="w-7 h-5 rounded-sm object-cover shrink-0"
                      />
                    ) : (
                      <span className="w-7 h-5 shrink-0" />
                    )}
                    <span className="text-sm font-medium text-white group-hover:text-white/80 transition-colors">
                      {circuit.Location.country}
                    </span>
                  </div>

                  <div className="text-right min-w-0">
                    <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors truncate">
                      {circuit.circuitName}
                    </p>
                    <p className="text-[11px] text-[#8b95a5] tracking-wide mt-0.5 truncate">
                      {circuit.Location.locality}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className={`text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors cursor-pointer ${
                  page === 0
                    ? "border-white/[0.06] text-white/20 cursor-default"
                    : "border-white/[0.12] text-white/50 hover:text-white hover:border-white/25"
                }`}
              >
                Previous
              </button>

              <span className="text-[11px] text-[#8b95a5] tracking-wide">
                {start + 1}–{Math.min(start + PER_PAGE, filtered.length)} of{" "}
                {filtered.length}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className={`text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors cursor-pointer ${
                  page >= totalPages - 1
                    ? "border-white/[0.06] text-white/20 cursor-default"
                    : "border-white/[0.12] text-white/50 hover:text-white hover:border-white/25"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
