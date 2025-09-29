import React from "react";

/** A tiny reusable component.
 *  Usage: <Greeting name="Lily" />
 */
export default function Greeting({ name }) {
  return (
    <div className="mt-4 rounded-xl border p-4">
      <p className="text-gray-700">
        Hi <span className="font-semibold text-indigo-600">{name}</span>! 👋
      </p>
    </div>
  );
}
