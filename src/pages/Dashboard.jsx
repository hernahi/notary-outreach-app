import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Users, Mail, BarChart3, LayoutDashboard, LogOut } from "lucide-react";

export default function Dashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Dynamic page title
  const getPageTitle = () => {
    if (location.pathname.includes("leads")) return "Leads";
    if (location.pathname.includes("campaigns")) return "Campaigns";
    if (location.pathname.includes("messages")) return "Messages";
    return "Dashboard";
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar (Mobile & Desktop) */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Notary Outreach</h2>
          <button
            className="lg:hidden p-1 text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink
            to="/leads"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <Users size={18} /> Leads
          </NavLink>
          <NavLink
            to="/campaigns"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <BarChart3 size={18} /> Campaigns
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            <Mail size={18} /> Messages
          </NavLink>
        </nav>

        <div className="absolute bottom-0 w-full border-t border-gray-700 p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay (for mobile sidebar) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-3">
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-blue-600"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {getPageTitle()}
          </h1>
          <div className="hidden lg:flex items-center gap-2 text-gray-600">
            <span className="text-sm">Welcome back 👋</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
