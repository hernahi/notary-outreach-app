import { Outlet } from "react-router-dom";

export default function Dashboard({ onLogout }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <a href="/leads" className="block px-2 py-1 hover:bg-gray-700 rounded">Leads</a>
          <a href="/campaigns" className="block px-2 py-1 hover:bg-gray-700 rounded">Campaigns</a>
          <a href="/messages" className="block px-2 py-1 hover:bg-gray-700 rounded">Messages</a>
        </nav>
        <button
          onClick={onLogout}
          className="mt-6 bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
