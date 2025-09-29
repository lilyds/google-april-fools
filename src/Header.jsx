
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
        {/* Logo dots */}
        <div className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#4285F4" }} />
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#EA4335" }} />
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#FBBC05" }} />
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "#34A853" }} />
        </div>

        <h1 className="text-[15px] font-semibold tracking-tight">
          Google April Fools’ <span className="text-[#1A73E8]">Archive</span>
        </h1>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="#"
            className="text-sm text-gray-600 hover:text-[#1A73E8]"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            About
          </a>
        </div>
      </div>
    </header>
  );
}
