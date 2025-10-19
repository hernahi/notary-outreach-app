import React from "react";
import campaigns from "../data/campaigns.json";

export default function Campaigns() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Campaigns</h1>
      <ul className="space-y-4">
        {campaigns.map((c) => (
          <li key={c.id} className="bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">{c.title}</h2>
            <p className="text-gray-600">{c.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
