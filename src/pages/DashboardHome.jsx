import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";

// Mock data
import leads from "../data/leads.json";
import campaigns from "../data/campaigns.json";
import messages from "../data/messages.json";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

export default function DashboardHome() {
  const [activeModal, setActiveModal] = useState(null);

  // Chart data
  const leadData = [
    { name: "Pending", value: leads.filter((l) => l.status === "Pending").length },
    { name: "Completed", value: leads.filter((l) => l.status === "Completed").length },
  ];

  const campaignData = campaigns.map((c) => ({
    name: c.title,
    value: c.progress || Math.floor(Math.random() * 100),
  }));

  const messageData = [
    { name: "Unread", value: messages.filter((m) => !m.read).length },
    { name: "Read", value: messages.filter((m) => m.read).length },
  ];

  const modalData = {
    leads: {
      title: "Lead Overview",
      chart: (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={leadData}
              dataKey="value"
              outerRadius={90}
              label
            >
              {leadData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
      table: leadData,
    },
    campaigns: {
      title: "Campaign Performance",
      chart: (
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={campaignData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
      table: campaignData,
    },
    messages: {
      title: "Message Status",
      chart: (
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={messageData}
              dataKey="value"
              outerRadius={90}
              label
            >
              {messageData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ),
      table: messageData,
    },
  };

  const renderLegend = (data) =>
    data.map((item, index) => (
      <div key={item.name} className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></span>
          <span className="text-sm font-medium text-gray-700">{item.name}</span>
        </div>
        <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-white bg-gray-700 rounded-full">
          {item.value}
        </span>
      </div>
    ));

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="relative p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Leads */}
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => openModal("leads")}
      >
        <CardHeader>
          <CardTitle>Leads</CardTitle>
        </CardHeader>
        <CardContent>{renderLegend(leadData)}</CardContent>
      </Card>

      {/* Campaigns */}
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => openModal("campaigns")}
      >
        <CardHeader>
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>{renderLegend(campaignData.slice(0, 2))}</CardContent>
      </Card>

      {/* Messages */}
      <Card
        className="cursor-pointer hover:shadow-lg transition"
        onClick={() => openModal("messages")}
      >
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>{renderLegend(messageData)}</CardContent>
      </Card>

      {/* Modal */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {modalData[activeModal].title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Chart */}
            <div className="mb-6">{modalData[activeModal].chart}</div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700 border">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-right">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {modalData[activeModal].table.map((row, i) => (
                    <tr key={i} className="border-t">
                      <td className="px-4 py-2">{row.name}</td>
                      <td className="px-4 py-2 text-right font-medium">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
