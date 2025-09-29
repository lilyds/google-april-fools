import React, { useEffect } from "react";

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[92vw] max-w-2xl rounded-2xl bg-white shadow-xl border border-gray-200">
        <div className="h-1 w-full rounded-t-2xl" style={{ background: "#1A73E8" }} />
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md border px-2 py-1 text-sm hover:bg-gray-50"
        >
          ✕
        </button>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

