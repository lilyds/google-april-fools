import React, { useEffect, useState } from "react";
import Header from "./Header";
import Greeting from "./Greeting";
import { JOKES } from "./jokes";
import Modal from "./Modal";
import PlayArea from "./PlayArea";
import Chip from "./Chip";

export default function App() {
  // state
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [selected, setSelected] = useState(null);

  // years for filter
  const allYears = Array.from(new Set(JOKES.map((j) => j.year))).sort((a, b) => b - a);

  // filters
  const filtered = JOKES.filter((j) => {
    const matchesQuery =
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      String(j.year).includes(query);
    const matchesYear = year === "All" || j.year === Number(year);
    return matchesQuery && matchesYear;
  });

  // grouped by year (newest first)
  const grouped = filtered
    .slice()
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    .reduce((acc, j) => {
      (acc[j.year] ||= []).push(j);
      return acc;
    }, {});

  // deep-link helpers (#/joke/<id>)
  function getHashJokeId() {
    const h = window.location.hash || "";
    const parts = h.replace(/^#\/?/, "").split("/");
    return parts[0] === "joke" && parts[1] ? parts[1] : null;
  }
  function openJoke(j) {
    setSelected(j);
    window.location.hash = `/joke/${j.id}`;
  }
  function closeJoke() {
    setSelected(null);
    if (getHashJokeId()) window.location.hash = `/`;
  }
  useEffect(() => {
    const id = getHashJokeId();
    if (id) {
      const j = JOKES.find((x) => x.id === id);
      if (j) setSelected(j);
    }
  }, []);
  useEffect(() => {
    const onHash = () => {
      const id = getHashJokeId();
      if (!id) return setSelected(null);
      const j = JOKES.find((x) => x.id === id) || null;
      setSelected(j);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // helper: guess a tag color from id (fun accent only)
  const tagFor = (id) => {
    if (id.includes("gmail")) return ["Gmail", "red"];
    if (id.includes("maps")) return ["Maps", "green"];
    if (id.includes("nose")) return ["Search", "blue"];
    if (id.includes("pigeon")) return ["Search", "blue"];
    if (id.includes("gulp")) return ["Labs", "yellow"];
    return ["Google", "gray"];
  };

  return (
    <div className="min-h-dvh bg-[var(--g-surface-2)]">
      <Header />

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-6">
        {/* Page intro */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h1 className="text-[22px] font-bold tracking-tight">
            Explore April Fools’ by year
          </h1>
          <p className="mt-1 text-[14px] text-[var(--g-text-2)]">
            Search the archive and try mini interactive demos for a few classics.
          </p>

          {/* Quick playful button from earlier */}
          <div className="mt-4">
            <button
              className="rounded-xl px-3 py-2 text-sm text-white transition"
              style={{ background: "#1A73E8" }}
              onClick={() => setCount((c) => c + 1)}
            >
              You clicked {count} time{count === 1 ? "" : "s"}
            </button>
          </div>
        </section>

        {/* Filter rail */}
        <section className="mt-6 flex flex-col gap-3 md:flex-row md:items-center">
          <select
            className="rounded-lg border bg-white px-3 py-2 text-sm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="All">All years</option>
            {allYears.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <div className="flex-1">
            <input
              className="w-full rounded-lg border bg-white px-3 py-2 text-sm"
              placeholder="Search by title or year…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          {/* Example chips (fun accents, optional) */}
          <div className="flex flex-wrap gap-2">
            <Chip color="blue">Search</Chip>
            <Chip color="red">Gmail</Chip>
            <Chip color="green">Maps</Chip>
            <Chip color="yellow">Labs</Chip>
          </div>
        </section>

        {/* Greeting demo (kept for learning) */}
        <section className="mt-6">
          <p className="text-xs text-[var(--g-text-2)]">Reusable component demo:</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div className="card p-4">
              <Greeting name="Lily" />
            </div>
            <div className="card p-4">
              <Greeting name="World" />
            </div>
          </div>
        </section>

        {/* Year sections with card grid */}
        <section className="mt-8 space-y-8">
          {Object.entries(grouped).map(([yr, items]) => (
            <div key={yr}>
              <div className="mb-3 flex items-center gap-3">
                <h2 className="text-xl font-semibold">{yr}</h2>
                <div className="h-px w-full bg-gray-200" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((j) => {
                  const [label, color] = tagFor(j.id);
                  const demo =
                    j.id.includes("nose") ||
                    j.id.includes("pigeon") ||
                    j.id.includes("gulp");
                  return (
                    <article
                      key={j.id}
                      className="card p-4 cursor-pointer"
                      onClick={() => openJoke(j)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium leading-snug">{j.title}</h3>
                        {demo && (
                          <span className="material text-[#1A73E8]" aria-hidden>play_circle</span>
                        )}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Chip color={color}>{label}</Chip>
                        <span className="text-xs text-[var(--g-text-2)]">Year {j.year}</span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Modal */}
        <Modal open={!!selected} onClose={closeJoke}>
          {selected && (
            <div>
              <h4 className="text-lg font-semibold">{selected.title}</h4>
              <p className="mt-1 text-sm text-[var(--g-text-2)]">Year {selected.year}</p>

              <div className="mt-4 text-sm text-gray-700 leading-relaxed">
                Try the mini demo below. Click outside the sheet or press Esc to close.
              </div>

              <PlayArea joke={selected} />

              <div className="mt-4 text-right">
                <button
                  className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
                  onClick={closeJoke}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </main>
    </div>
  );
}

