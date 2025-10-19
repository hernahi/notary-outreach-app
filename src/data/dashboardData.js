import { leads } from "./leads";
import { campaigns } from "./campaigns";
import { messages } from "./messages";

export async function fetchDashboardStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    leads: leads.length,
    campaigns: campaigns.length,
    messages: messages.length,
    performance: 87, // mock % for now
  };
}
