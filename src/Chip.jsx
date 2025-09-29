import React from "react";

const COLORS = {
  gray: "border-gray-300 text-gray-700",
  blue: "border-[#1A73E8] text-[#1A73E8]",
  green: "border-[#34A853] text-[#34A853]",
  yellow: "border-[#FBBC05] text-[#C18F00]",
  red: "border-[#EA4335] text-[#EA4335]",
};

export default function Chip({ children, color = "gray" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs ${COLORS[color]} bg-white`}
    >
      {children}
    </span>
  );
}
