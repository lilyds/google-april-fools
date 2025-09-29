import React, { useState } from "react";

function NosePlay() {
  const scents = [
    "Freshly debugged code",
    "Vintage pager",
    "Server room ozone",
    "Quantum banana",
  ];
  const [sniff, setSniff] = useState(null);

  return (
    <div className="mt-3 rounded-lg border p-3">
      <p className="text-sm text-gray-600">
        Bring your nose closer… then click <strong>Sniff</strong>.
      </p>
      <button
        className="mt-3 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
        onClick={() => {
          const pick = scents[Math.floor(Math.random() * scents.length)];
          setSniff(pick);
        }}
      >
        Sniff
      </button>
      {sniff && (
        <div className="mt-3 text-lg font-semibold text-indigo-700">{sniff}</div>
      )}
    </div>
  );
}

function PigeonRankPlay() {
  const [pigeons, setPigeons] = useState(8);
  const [grains, setGrains] = useState(3);
  const score = Math.round((pigeons * 42 + grains * 7) % 100);

  return (
    <div className="mt-3 rounded-lg border p-3">
      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          Pigeons
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            type="number"
            min="1"
            max="100"
            value={pigeons}
            onChange={(e) => setPigeons(parseInt(e.target.value || "1", 10))}
          />
        </label>
        <label className="text-sm">
          Grain quality
          <input
            className="mt-1 w-full rounded border px-2 py-1"
            type="number"
            min="0"
            max="10"
            value={grains}
            onChange={(e) => setGrains(parseInt(e.target.value || "0", 10))}
          />
        </label>
      </div>

      <div className="mt-3 text-sm text-gray-600">Estimated P-Rank</div>
      <div className="text-3xl font-semibold text-indigo-700">{score}</div>
      <div className="text-xs text-gray-500">(More pigeons → usually higher rank.)</div>
    </div>
  );
}

function GulpPlay() {
  const [flavor, setFlavor] = useState("Auto-Refresh Mint");
  const [sips, setSips] = useState(1);
  const iq = 100 + Math.min(50, sips * 5);

  return (
    <div className="mt-3 rounded-lg border p-3">
      <label className="text-sm block">
        Flavor
        <input
          className="mt-1 w-full rounded border px-2 py-1"
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
        />
      </label>

      <label className="text-sm block mt-3">
        Sips
        <input
          className="mt-1 w-full rounded border px-2 py-1"
          type="number"
          min="0"
          max="20"
          value={sips}
          onChange={(e) => setSips(parseInt(e.target.value || "0", 10))}
        />
      </label>

      <div className="mt-3 text-sm text-gray-600">Your optimized IQ</div>
      <div className="text-3xl font-semibold text-indigo-700">{iq}</div>
      <div className="text-xs text-gray-500">(Side effects may include over-optimization.)</div>
    </div>
  );
}



/** Decides what mini-demo to show for a joke */
export default function PlayArea({ joke }) {
  if (!joke) return null;

  // simple routing: if the id includes "nose", show the Nose demo
  if (joke.id.includes("nose")) return <NosePlay />;

  if (joke.id.includes("pigeon")) return <PigeonRankPlay />;

  if (joke.id.includes("gulp")) return <GulpPlay />;



  // fallback for jokes without a demo yet
  return (
    <div className="mt-3 rounded-lg border p-3 text-sm text-gray-600">
      No interactive demo yet for <strong>{joke.title}</strong>. (We’ll add more soon!)
    </div>
  );
}
