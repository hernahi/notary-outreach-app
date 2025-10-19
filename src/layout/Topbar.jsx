import React from "react";

export default function Topbar({ onLogout }) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-3">
      <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      <button
        onClick={onLogout}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
      >
        Logout
      </button>
    </header>
  );
}
