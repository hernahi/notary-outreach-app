export default function Dashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">Notary Outreach Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-white text-blue-600 font-medium px-3 py-1 rounded-md hover:bg-blue-100 transition-all"
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
        <p className="text-gray-600">
          This is your dashboard. Placeholder for leads, campaigns, and stats.
        </p>

        {/* Example Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-800">Leads</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">128</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-800">Campaigns</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">12</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
            <h3 className="font-semibold text-lg text-gray-800">Messages</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">45</p>
          </div>
        </div>
      </main>
    </div>
  );
}
