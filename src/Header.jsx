import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold">
          Google April Fools’ <span className="text-indigo-600">Playground</span>
        </h1>
        <nav className="text-sm text-gray-600">
          <a
            href="#"
            className="rounded px-2 py-1 hover:bg-gray-100"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Top ↑
          </a>
        </nav>
      </div>
    </header>
  );
}
