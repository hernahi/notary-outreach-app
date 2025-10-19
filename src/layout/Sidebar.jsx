import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Megaphone, MessageSquare } from "lucide-react";

export default function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Leads", path: "/leads", icon: <Users size={18} /> },
    { name: "Campaigns", path: "/campaigns", icon: <Megaphone size={18} /> },
    { name: "Messages", path: "/messages", icon: <MessageSquare size={18} /> },
  ];

  return (
    <aside className="w-56 bg-white border-r shadow-sm p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-indigo-600">Notary CRM</h1>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-indigo-100 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {link.icon}
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
