// src/pages/NotaryDashboard.jsx

export default function NotaryDashboard({ onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-green-600 text-white p-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-semibold">Notary Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-white text-green-600 font-medium px-3 py-1 rounded-md hover:bg-green-100 transition-all"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome, Notary!
        </h2>
        <p className="text-gray-600">
          You are logged in as a notary. Here you’ll eventually manage your appointments.
        </p>
      </main>
    </div>
  );
}
