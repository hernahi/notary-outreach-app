import React from "react";
import CountUp from "react-countup";
import leads from "../data/leads.json";
import { getUser } from "../utils/auth";

export default function Leads() {
  const currentUser = getUser();
  const visibleLeads =
    currentUser.role === "admin"
      ? leads
      : leads.filter((lead) => lead.owner === currentUser.email);

  const totalLeads = visibleLeads.length;
  const completedLeads = visibleLeads.filter(
    (l) => l.status === "Completed"
  ).length;
  const pendingLeads = totalLeads - completedLeads;

  return (
    <div className="p-8 space-y-8">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Total Leads</h3>
          <p className="text-3xl font-bold text-blue-600 mt-1">
            <CountUp end={totalLeads} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-1">
            <CountUp end={completedLeads} duration={1.5} />
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 text-center">
          <h3 className="text-sm font-medium text-gray-600">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-1">
            <CountUp end={pendingLeads} duration={1.5} />
          </p>
        </div>
      </div>

      {/* List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Leads</h2>
        <ul className="space-y-4">
          {visibleLeads.map((lead) => (
            <li
              key={lead.id}
              className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex justify-between"
            >
              <span>{lead.name}</span>
              <span
                className={`font-semibold ${
                  lead.status === "Completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {lead.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
