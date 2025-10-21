import React, { useEffect, useState } from "react";
import {
  Users,
  Mail,
  BarChart3,
  Clock,
  RefreshCcw,
  Activity,
  Pause,
  Play,
  History,
  Trash2,
} from "lucide-react";
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
import leadsData from "../data/leads.json";
import campaignsData from "../data/campaigns.json";
import messagesData from "../data/messages.json";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card.jsx";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

// Animated counter hook
const useCounter = (targetValue, duration = 1000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(targetValue / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= targetValue) {
        setCount(targetValue);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [targetValue, duration]);
  return count;
};

// Helper to randomize values
const randomizeValue = (base, variance = 5) =>
  Math.max(0, base + Math.floor(Math.random() * variance - variance / 2));

export default function DashboardHome() {
  const [filter, setFilter] = useState("week");
  const [leads, setLeads] = useState(leadsData);
  const [campaigns, setCampaigns] = useState(campaignsData);
  const [messages, setMessages] = useState(messagesData);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLive, setIsLive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [updateLog, setUpdateLog] = useState([]);
  const [logCleared, setLogCleared] = useState(false);

  // Stats
  const totalLeads = leads.length;
  const activeCampaigns = campaigns.filter((c) => c.active).length;
  const unreadMessages = messages.filter((m) => !m.read).length;

  const leadCount = useCounter(totalLeads);
  const campaignCount = useCounter(activeCampaigns);
  const messageCount = useCounter(unreadMessages);

  const leadData = [
    { name: "Pending", value: leads.filter((l) => l.status === "Pending").length },
    { name: "Completed", value: leads.filter((l) => l.status === "Completed").length },
  ];

  const campaignChartData = campaigns.map((c) => ({
    name: c.title,
    value: c.progress || Math.floor(Math.random() * 100),
  }));

  const messageData = [
    { name: "Unread", value: unreadMessages },
    { name: "Read", value: messages.filter((m) => m.read).length },
  ];

  // Live auto-refresh simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLive) {
        let changes = [];

        const newLeads = leads.map((l) => {
          if (Math.random() > 0.97 && l.status === "Pending") {
            changes.push(`Lead "${l.name}" marked Completed`);
            return { ...l, status: "Completed" };
          }
          return l;
        });

        const newCampaigns = campaigns.map((c) => {
          const newProgress = randomizeValue(c.progress ?? 50, 10);
          if (newProgress !== c.progress) {
            changes.push(`Campaign "${c.title}" updated (${newProgress}%)`);
          }
          return { ...c, progress: newProgress };
        });

        const newMessages = messages.map((m) => {
          if (Math.random() > 0.95 && !m.read) {
            changes.push(`Message from "${m.from}" marked as read`);
            return { ...m, read: true };
          }
          return m;
        });

        setLeads(newLeads);
        setCampaigns(newCampaigns);
        setMessages(newMessages);
        setLastUpdated(new Date());

        if (changes.length > 0) {
          const newEntry = {
            id: Date.now(),
            time: new Date().toLocaleTimeString(),
            changes,
          };
          setUpdateLog((prev) => [newEntry, ...prev.slice(0, 4)]);
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isLive, leads, campaigns, messages]);

  // Filter transitions
  const handleFilterChange = (option) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFilter(option);
      setIsTransitioning(false);
    }, 300);
  };

  const toggleLiveUpdates = () => setIsLive((prev) => !prev);

  // Clear log with confirmation
  const handleClearLog = () => {
    if (window.confirm("Are you sure you want to clear the update log?")) {
      setUpdateLog([]);
      setLogCleared(true);
      setTimeout(() => setLogCleared(false), 2000);
    }
  };

  const recentActivity = [
    { id: 1, type: "lead", name: "New lead from website", time: "3m ago" },
    { id: 2, type: "campaign", name: "Fall campaign launched", time: "45m ago" },
    { id: 3, type: "message", name: "New inquiry message received", time: "1h ago" },
  ];

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      {/* Header Controls */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex gap-2">
          {["today", "week", "month"].map((option) => (
            <button
              key={option}
              onClick={() => handleFilterChange(option)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                filter === option
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              } transition`}
            >
              {option === "today"
                ? "Today"
                : option === "week"
                ? "This Week"
                : "This Month"}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isLive ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            ></span>
            <span className="text-gray-600">
              {isLive ? "Live updating" : "Paused"}
            </span>
          </div>

          <button
            onClick={toggleLiveUpdates}
            className={`flex items-center gap-1 text-sm rounded-md px-2 py-1 ${
              isLive
                ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            } transition`}
          >
            {isLive ? <Pause size={14} /> : <Play size={14} />}
            {isLive ? "Pause" : "Resume"}
          </button>

          <button
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition"
            onClick={() => window.location.reload()}
          >
            <RefreshCcw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* Last Synced */}
      <div className="text-xs text-gray-500 mt-1">
        Last synced: {lastUpdated.toLocaleTimeString()}
      </div>

      {/* Summary Metrics */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-500 ${
          isTransitioning ? "opacity-50" : "opacity-100"
        }`}
      >
        <Card className="flex items-center gap-4 p-6 hover:shadow-lg transition">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Users size={28} />
          </div>
          <div>
            <CardTitle>Total Leads</CardTitle>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800">{leadCount}</p>
            </CardContent>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-6 hover:shadow-lg transition">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <BarChart3 size={28} />
          </div>
          <div>
            <CardTitle>Active Campaigns</CardTitle>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800">{campaignCount}</p>
            </CardContent>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-6 hover:shadow-lg transition">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <Mail size={28} />
          </div>
          <div>
            <CardTitle>Unread Messages</CardTitle>
            <CardContent>
              <p className="text-3xl font-bold text-gray-800">{messageCount}</p>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CardHeader>
            <CardTitle>Lead Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={leadData} dataKey="value" outerRadius={90} label>
                  {leadData.map((entry, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader>
            <CardTitle>Campaign Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={campaignChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity + Update Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Activity size={18} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-gray-200">
              {[
                { id: 1, type: "lead", name: "New lead from website", time: "3m ago" },
                { id: 2, type: "campaign", name: "Fall campaign launched", time: "45m ago" },
                { id: 3, type: "message", name: "New inquiry message received", time: "1h ago" },
              ].map((item) => (
                <li key={item.id} className="py-3 flex justify-between items-center">
                  <div>
                    <p className="text-gray-800 font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.type}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Update Timeline */}
        <Card className="p-6">
          <CardHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CardTitle>Last 5 Updates</CardTitle>
              <History size={18} className="text-gray-500" />
            </div>
            <button
              onClick={handleClearLog}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition"
            >
              <Trash2 size={14} /> Clear Log
            </button>
          </CardHeader>
          <CardContent>
            {logCleared && (
              <div className="text-xs text-green-600 mb-2 animate-fadeIn">
                ✅ Update log cleared
              </div>
            )}
            {updateLog.length === 0 ? (
              <p className="text-sm text-gray-500">No updates yet.</p>
            ) : (
              <ul className="space-y-3">
                {updateLog.map((log) => (
                  <li
                    key={log.id}
                    className="bg-gray-50 border rounded-lg p-3 shadow-sm animate-fadeIn"
                  >
                    <div className="text-xs text-gray-400 mb-1">{log.time}</div>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
                      {log.changes.map((change, i) => (
                        <li key={i}>{change}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
