import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-3 rounded-lg mb-2 text-gray-700 hover:bg-indigo-100 ${
      isActive ? "bg-indigo-200 font-semibold" : ""
    }`;

  return (
    <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Notary Portal</h1>
      <nav className="flex-1">
        <NavLink to="/dashboard" className={linkClasses}>Dashboard</NavLink>
        <NavLink to="/leads" className={linkClasses}>Leads</NavLink>
        <NavLink to="/campaigns" className={linkClasses}>Campaigns</NavLink>
        <NavLink to="/messages" className={linkClasses}>Messages</NavLink>
      </nav>
    </aside>
  );
}
