import React from "react";
import leads from "../data/leads.json";

export default function Leads() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      <ul className="space-y-4">
        {leads.map((l) => (
          <li key={l.id} className="bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">{l.name}</h2>
            <p className="text-gray-600">Status: {l.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
