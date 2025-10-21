import React from "react";
import CountUp from "react-countup";
import campaigns from "../data/campaigns.json";
import { getUser } from "../utils/auth";

export default function Campaigns() {
  const currentUser = getUser();
  const visibleCampaigns =
    currentUser.role === "admin"
      ? campaigns
      : campaigns.filter((c) => c.owner === currentUser.email);

  const totalCampaigns = visibleCampaigns.length;
  const activeCampaigns = visibleCampaigns.filter((c) => c.status === "Active").length;
  const completedCampaigns = totalCampaigns - activeCampaigns;

  return (
    <div className="p-8 space-y-8">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Campaigns</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            <CountUp end={totalCampaigns} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Active</h3>
          <p className="text-3xl font-bold text-green-600 mt-1">
            <CountUp end={activeCampaigns} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          <p className="text-3xl font-bold text-purple-600 mt-1">
            <CountUp end={completedCampaigns} duration={1.5} />
          </p>
        </div>
      </div>

      {/* List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Campaigns</h2>
        <ul className="space-y-4">
          {visibleCampaigns.map((c) => (
            <li
              key={c.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <span>{c.name}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    c.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
