// src/components/ui/Card.jsx
import React, { useRef } from "react";

export function Card({ children, className = "", onClick, rippleColor = "rgba(99,102,241,0.25)" }) {
  const rippleRef = useRef(null);

  const handleClick = (e) => {
    if (onClick) onClick(e);

    const rippleContainer = rippleRef.current;
    if (!rippleContainer) return;

    const ripple = document.createElement("span");
    const rect = rippleContainer.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.backgroundColor = rippleColor;
    ripple.className = "ripple";

    rippleContainer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div
      ref={rippleRef}
      onClick={handleClick}
      className={`relative overflow-hidden bg-white shadow rounded-lg p-4 flex flex-col transition 
        ${onClick ? "cursor-pointer hover:shadow-lg hover:scale-[1.01]" : ""} 
        ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`flex items-center justify-between mb-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
}
