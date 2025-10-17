import { campaigns } from "../data/campaigns";
import { getUser } from "../utils/auth";

export default function Campaigns() {
  const currentUser = getUser();
  const visibleCampaigns =
    currentUser.role === "admin"
      ? campaigns
      : campaigns.filter((c) => c.owner === currentUser.email);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Campaigns</h2>
      <ul className="space-y-4">
        {visibleCampaigns.map((c) => (
          <li
            key={c.id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
