// src/components/ui/card.jsx
import React from "react";

// Main Card wrapper
export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white shadow rounded-lg p-4 flex flex-col ${className}`}
    >
      {children}
    </div>
  );
}

// Card header (optional, can contain title or badges)
export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between mb-2 ${className}`}>
      {children}
    </div>
  );
}

// Card title
export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>{children}</h2>;
}

// Card content wrapper
export function CardContent({ children, className = "" }) {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
}
