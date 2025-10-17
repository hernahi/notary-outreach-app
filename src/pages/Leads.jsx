import { leads } from "../data/leads";
import { getUser } from "../utils/auth";

export default function Leads() {
  const currentUser = getUser();
  const visibleLeads =
    currentUser.role === "admin"
      ? leads
      : leads.filter((lead) => lead.owner === currentUser.email);

  return (
    <div className="p-8">
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
                lead.status === "Completed" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {lead.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
