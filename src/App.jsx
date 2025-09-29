import React, { useEffect, useState } from "react";
import Header from "./Header";
import Greeting from "./Greeting";
import { JOKES } from "./jokes";
import Modal from "./Modal";
import PlayArea from "./PlayArea";

export default function App() {
  // UI state
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("All");
  const [selected, setSelected] = useState(null);

  // derive available years
  const allYears = Array.from(new Set(JOKES.map((j) => j.year))).sort(
    (a, b) => b - a
  );

  // filter by search + year
  const filtered = JOKES.filter((j) => {
    const matchesQuery =
      j.title.toLowerCase().includes(query.toLowerCase()) ||
      String(j.year).includes(query);
    const matchesYear = year === "All" || j.year === Number(year);
    return matchesQuery && matchesYear;
  });

  // group filtered jokes by year (newest first)
  const grouped = filtered
    .slice()
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
    .reduce((acc, j) => {
      (acc[j.year] ||= []).push(j);
      return acc;
    }, {});

  // ---- Deep-link helpers (#/joke/<id>) ----
  function getHashJokeId() {
    const h = window.location.hash || "";
    const parts = h.replace(/^#\/?/, "").split("/");
    return parts[0] === "joke" && parts[1] ? parts[1] : null;
  }

  function openJoke(joke) {
    setSelected(joke);
    window.location.hash = `/joke/${joke.id}`;
  }

  function closeJoke() {
    setSelected(null);
    if (getHashJokeId()) window.location.hash = `/`;
  }

  // open from URL on first load
  useEffect(() => {
    const id = getHashJokeId();
    if (!id) return;
    const j = JOKES.find((x) => x.id === id);
    if (j) setSelected(j);
  }, []);

  // react to back/forward (hash changes)
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

  return (
    <div className="min-h-dvh bg-white">
      <Header />

      <main className="mx-auto max-w-3xl px-4 pb-16 pt-6">
        {/* heading */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Hello, React <span className="text-indigo-600">+ Tailwind</span> 👋
        </h1>
        <p className="mt-2 text-gray-600">
          If you can see the colored text and nice spacing, Tailwind is working.
        </p>

        {/* counter button */}
        <div className="mt-6">
          <button
            className="rounded-xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition"
            onClick={() => setCount((c) => c + 1)}
          >
            You clicked {count} time{count === 1 ? "" : "s"}
          </button>
        </div>

        {/* reusable component demo */}
        <hr className="my-6" />
        <p className="text-sm text-gray-500">Reusable component demo:</p>
        <Greeting name="Lily" />
        <Greeting name="World" />

        {/* jokes list with year + search controls */}
        <hr className="my-6" />
        <h2 className="text-2xl font-semibold">Jokes</h2>

        <div className="mt-3 flex gap-3">
          <select
            className="rounded-lg border px-3 py-2"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="All">All years</option>
            {allYears.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <input
            className="flex-1 rounded-lg border px-3 py-2"
            placeholder="Search by title or year…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* grouped list */}
        <div className="mt-3 space-y-6">
          {Object.entries(grouped).map(([year, items]) => (
            <section key={year}>
              <h3 className="text-xl font-semibold">{year}</h3>
              <ul className="mt-2 space-y-2">
                {items.map((j) => (
                  <li
                    key={j.id}
                    className="rounded-lg border p-3 cursor-pointer hover:bg-gray-50"
                    onClick={() => openJoke(j)}
                  >
                    <div className="font-medium">{j.title}</div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* modal for details + play area */}
        <Modal open={!!selected} onClose={closeJoke}>
          {selected && (
            <div>
              <h4 className="text-lg font-semibold">{selected.title}</h4>
              <p className="mt-1 text-sm text-gray-600">Year {selected.year}</p>

              <div className="mt-4 text-sm text-gray-700 leading-relaxed">
                This is where we’ll show more details, links, and a small “play”
                demo. Click outside the box or press Esc to close.
              </div>

              <PlayArea joke={selected} />

              <div className="mt-4 text-right">
                <button
                  className="rounded-lg border px-3 py-2 hover:bg-gray-50"
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
